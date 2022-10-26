const express = require("express");
const cors = require("cors");
const path = require("path")
require("./connection/connection");
require("dotenv").config();
const router = require("./Router/router")
const app = express();
const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(router)
app.use(express.static(path.resolve(__dirname, "client/build")));
/* const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
 */

const server = app.listen(process.env.PORT || 5000, () => {
  const port = server.address().port;
  console.log(`http://localhost: ${port}`);
});

