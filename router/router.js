const express = require("express");
const { _getUsers } = require("../controller/users");
const router = express.Router();
router.get("/users", _getUsers);
module.exports = router;
