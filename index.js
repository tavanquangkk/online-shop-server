// import express module
const express = require("express");
const authRoute = require("./routes/auth");
const mongoose = require("mongoose");

require("dotenv").config();

// Define the port number the server will listen on
const PORT = process.env.PORT;
const MONGO_DB_USER = encodeURIComponent(process.env.MONGO_DB_USER);
const MONGO_DB_PASSWORD = encodeURIComponent(process.env.MONGO_DB_PASSWORD);

// create an instance of an express application
// because it give us the starting point
const app = express();

// mongodb string
const DB = `mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASSWORD}@cluster0.kfzevvf.mongodb.net/?appName=Cluster0`;

// middleware to register routes or to mount routes
app.use(express.json());
app.use(authRoute);

mongoose.connect(DB).then(() => {
    console.log("mongodb connected");
});

// start the server and listen on the specified port
app.listen(PORT, "0.0.0.0", function () {
    // log the port number
    console.log(`server is running on port: ${PORT}`);
});
