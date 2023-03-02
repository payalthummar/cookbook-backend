const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const { Pool } = require("pg");
const cors = require("cors");
app.use(cors());
require("dotenv").config();
app.use(express.json());

const pool = new Pool({
  PGHOST: process.env.PGHOST,
  PGUSER: process.env.PGUSER,
  PGDATABASE: process.env.USER,
  PGPASSWORD: process.env.PGPASSWORD,
  PGPORT: 5432,
});

app.get("/api/recipes", (req, res) => {
  pool
    .query("SELECT * FROM recipes")
    .then((data) => res.send(data.rows))
    .catch((e) => {
      console.log(e.message);
      res.sendStatus(500);
    });
});

app.get("/", (req, res) => {
  res.send("Welcome to the recipes API");
});

app.listen(PORT, () => {
  console.log(`server listening on http://localhost:${PORT}`);
});
