require("dotenv").config();

const PORT = process.env.PORT || 5000;

const express = require("express");
const cors = require("cors");
const dbo = require("./dbo")

const app = express();

async function getRights() {
	let mongoClient = await dbo.mongoClient();
    let db = mongoClient.db("rights-engine");
    let collection = db.collection("rights");
	let rights = await collection.find().toArray();
	mongoClient.close(true);
	return rights;
}

app.use(cors());
app.use(express.json());
app.get("/rights", async (req, res) => {
	let t1 = new Date();
	let rights = require("./data/rights.json");
	//let rights = await getRights();
	let t2 = new Date();
	let diff = t2.getTime() - t1.getTime();
    console.log("rights:", rights.length, "time:", diff);
	res.status(200).send({rights, serverTime: diff});
})
app.listen(PORT, () => {
	console.log(`Server is running on port: ${PORT}`);
});

