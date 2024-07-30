require("dotenv").config();

const PORT = process.env.PORT || 5000;
const MODE = process.env.MODE || "prod"
const DB_CONN_STR = process.env.DB_CONN_STR;
const DELIMITER = "-------------"

const { MongoClient } = require("mongodb");
const express = require("express");
const cors = require("cors");
const app = express();

async function createMongoClient() {
	let mongoClient;

	try {
		mongoClient = new MongoClient(DB_CONN_STR);
		await mongoClient.connect();
		console.log('Connected to MongoDB');
		return mongoClient;
	}
	catch (err) {
		console.error('Failed to connect to MongoDB', err);
		process.exit();
	}
}


async function getFromDB() {
	let mongoClient = await createMongoClient();
	let db = mongoClient.db("rights-engine");
	let collection = db.collection("rights");
	let rights = await collection.find().toArray();
	mongoClient.close(true);
	return rights;
}

async function getFromFile() {
	return require("./data/rights.json");
}

app
	.use(cors())
	.use(express.json())
	.get("/hz", (req, res) => {
		console.log("/hz");
		console.log(DELIMITER)
		res.status(200).send("hz");
	})
	.get("/ready", async (req, res) => {
		let msg = "/ready";
		console.log(msg)
		let status = 200;
		try {
			let mongoClient = await createMongoClient();
			mongoClient.db("rights-engine");
			mongoClient.close();
		}
		catch (err) {
			status = 503;
			console.log(err);
			msg = "not ready";
		}
		finally {
			console.log("ok");
			console.log(DELIMITER)
			res.status(status).send(msg);
		}
	})
	.get("/rights", async (req, res) => {
		console.log("/rights");
		let t1 = new Date();
		let rights = MODE == "dev" ?
			await getFromFile() :
			await getFromDB();
		let t2 = new Date();
		let diff = t2.getTime() - t1.getTime();
		let resBody = { rights: rights.length, mode: MODE, serverTime: diff }
		console.log(resBody);
		resBody.rights = rights;
		console.log(DELIMITER)
		res.status(200).send(resBody);
	})
	.get("/", (req, res) => {
		console.log("/");
		console.log(DELIMITER)
		res.status(200).send("ok");
	})
	.listen(PORT, () => {
		console.log(`Mode: ${MODE}. Port: ${PORT}. Running`);
		console.log(DELIMITER)
	});

