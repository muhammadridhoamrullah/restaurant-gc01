if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = require("./routes/index");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routing
app.use(router);

// Ekspor aplikasi Express untuk Vercel
module.exports = (req, res) => {
  app(req, res);
};
