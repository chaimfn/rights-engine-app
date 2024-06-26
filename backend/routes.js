const express = require("express");

// routes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /listings.
const routes = express.Router();

// This will help us connect to the database
const db = require("./db");

// This section will help you get a list of all the records.
routes.route("/rights").get(async function (req, res) {
    // Get records
});

module.exports = routes;
