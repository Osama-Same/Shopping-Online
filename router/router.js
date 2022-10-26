const express = require("express");
const { _getUsers } = require("../controller/users");
const { _getProducts } = require("../controller/products");
const router = express.Router();
router.get("/users", _getUsers);
router.get("/products", _getProducts);
module.exports = router;
