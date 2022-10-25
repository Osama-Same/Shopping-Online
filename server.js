const express = require("express");
const cors = require("cors");
const path = require("path")
const app = express();
const router = require("./Router/router");
const bodyParser = require('body-parser')
require("./connection/connection");
const sslRedirect = require('heroku-ssl-redirect').default
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
app.use(sslRedirect());

app.get('/', function(req, res){
  res.send('hello world');
});
app.use(express.static(path.resolve(__dirname, "client/build")));

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);

});

