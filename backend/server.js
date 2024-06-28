require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MODE = process.env.MODE || "production"

const express = require("express");
const cors = require("cors");
const dbo = require("./dbo")

const app = express();

async function getFromDB() {
	let mongoClient = await dbo.mongoClient();
	let db = mongoClient.db("rights-engine");
	let collection = db.collection("rights");
	let rights = await collection.find().toArray();
	mongoClient.close(true);
	return rights;
}

async function getFromFile() {
	return require("./data/rights.json");
}

app.use(cors());
app.use(express.json());
app.get("/rights", async (req, res) => {
	let t1 = new Date();
	let rights = MODE == "production" ?
		await getFromDB() :
		await getFromFile();
	let t2 = new Date();
	let diff = t2.getTime() - t1.getTime();
	let resBody = { rights, mode: MODE, serverTime: diff }
	console.log(resBody);
	res.status(200).send(resBody);
})
app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});

