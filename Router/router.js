const express = require("express");
const { _get, _save, _put, _delete } = require("../controller/users");
const { check } = require("express-validator");
const { upload } = require("../connection/upload");
const router = express.Router();

// users
router.get("/users", _get);
router.delete("/users/:id", _delete);
router.post( "/users",upload.single("image"),
  [
    check("name", "name field is required").isLength({ min: 3 }),
    check("email", "Email field is required").isEmail(),
    check("password", "Passowrd field is required").isLength({ min: 4 }),
    check("phone", "Phone field is required").isLength({ min: 10 }),
  ],
  _save
);
router.put("/users/:id",upload.single("image"),
  [
    check("name", "name field is required").isLength({ min: 3 }),
    check("email", "Email field is required").isEmail(),
    check("phone", "Phone field is required").isLength({ min: 10 }),
  ],
  _put
);

module.exports = router;
