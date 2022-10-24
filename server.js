const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./Router/router");
require("./connection/connection");
const sslRedirect = require('heroku-ssl-redirect').default
require("dotenv").config();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(router);
app.use(sslRedirect());

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`https://localhost:${PORT}`);
});

