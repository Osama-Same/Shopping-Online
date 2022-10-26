const express = require("express");
const cors = require("cors");
const path = require("path")
const app = express();
const router = require("./Router/router");
const bodyParser = require('body-parser')
require("./connection/connection");
require("dotenv").config();
const PORT = process.env.PORT || 5000;
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json())
app.use(router);



app.use(express.static(path.resolve(__dirname, "client/build")));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);

});

