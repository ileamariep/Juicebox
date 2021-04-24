require("dotenv").config();


const { PORT = 3000 } = process.env

const express = require("express");
const server = express();

// const { client } = require("./db");

const client = new Client({
  connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/juicebox-dev',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
});

client.connect();

const bodyParser = require("body-parser");
server.use(bodyParser.json());

const morgan = require("morgan");
server.use(morgan("dev"));

const apiRouter = require("./api");
server.use("/api", apiRouter);

server.listen(PORT, () => {
  console.log("The server is up on port", PORT);
});