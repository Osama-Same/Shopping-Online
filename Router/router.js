const express = require("express");
const { _get, _save, _put, _delete, login } = require("../controller/users");
const { _getC, _saveC } = require("../controller/contact");
const { _getN, _saveN } = require("../controller/news");
const { _getCO, _saveCO } = require("../controller/comment");
const { _getP, _saveP, _putP, _deleteP } = require("../controller/post");
const { _getL, _saveL, _putL } = require("../controller/like");
const { _getOR, _saveOR, _putOR, _deleteLOR } = require("../controller/orders");
const {
  _getCA,
  _saveCA,
  _putCA,
  _deleteCA,
} = require("../controller/categories");
const { check } = require("express-validator");
const { upload } = require("../connection/upload");
const router = express.Router();

// users
router.get("/users", _get);
router.delete("/users/:id", _delete);
router.post(
  "/users",
  upload.single("image"),
  [
    check("name", "name field is required").isLength({ min: 3 }),
    check("email", "Email field is required").isEmail(),
    check("password", "Passowrd field is required").isLength({ min: 4 }),
    check("phone", "Phone field is required").isLength({ min: 10 }),
  ],
  _save
);
router.put(
  "/users/:id",
  upload.single("image"),
  [
    check("name", "name field is required").isLength({ min: 3 }),
    check("email", "Email field is required").isEmail(),
    check("phone", "Phone field is required").isLength({ min: 10 }),
  ],
  _put
);
router.post(
  "/login",
  [
    check("email", "Email field is required").isEmail(),
    check("password", "Passowrd field is required").isLength({ min: 4 }),
  ],
  login
);

// contact
router.get("/contact", _getC);
router.post("/contact", _saveC);

// news
router.get("/news", _getN);
router.post("/news", _saveN);

// Categories
router.get("/categories", _getN);
router.post("/categories", upload.single("logo"), _saveN);
router.put("/categories", upload.single("logo"), _putCA);
router.delete("/categories/:id", _deleteCA);

// Posts
router.get("/post", _getP);
router.post(
  "/post",
  upload.single("images"),
  [
    check("name", "name field is required").isLength({ min: 3 }),
    check("country", "country field is required").isLength({ min: 3 }),
    check("price", "price field is required").isLength({ min: 3 }),
    check("date", "date field is required").isLength({ min: 3 }),
    check("description", "description field is required").isLength({ min: 3 }),
  ],
  _saveP
);
router.put(
  "/post/:id",
  upload.single("images"),
  [
    check("name", "name field is required").isLength({ min: 3 }),
    check("country", "country field is required").isLength({ min: 3 }),
    check("price", "price field is required").isLength({ min: 3 }),
    check("date", "date field is required").isLength({ min: 3 }),
    check("description", "description field is required").isLength({ min: 3 }),
  ],
  _putP
);
router.delete("/post/:id", _deleteP);

// comment

router.get("/comment", _getCO);
router.post("/comment", _saveCO);

// Like

router.get("/like", _getL);
router.post("/like", _saveL);
router.put("/like/:id", _putL);

// orders

router.get("/orders", _getOR);
router.post("/orders", _saveOR);
router.put("/orders/:id", _putOR);
router.delete("/orders/:id", _putOR);
module.exports = router;
