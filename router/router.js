const express = require("express");
const { check } = require("express-validator");
const { upload } = require("../connection/upload");
const { _getUsers } = require("../controller/users");
const { _getProducts } = require("../controller/products");

const {
  _getCategories,
  _saveCategory,
  _putCategory,
  _deleteCategory,
} = require("../controller/categories");
const {
  _getContact,
  _saveContact,
  _putContact,
  _deleteContact,
} = require("../controller/contact");
const {
  _getNews,
  _saveNews,
  _putNews,
  _deleteNews,
} = require("../controller/news");
const {
  _getComment,
  _saveComment,
  _putComment,
  _deleteComment,
} = require("../controller/comment");
const {
  _getLike,
  _saveLike,
  _putLike,
  _deleteLike,
} = require("../controller/likee");
const {
  _getOrders,
  _saveOrders,
  _putOrders,
  _deleteOrders,
} = require("../controller/orders");

const router = express.Router();
router.get("/users", _getUsers);
router.get("/products", _getProducts);

//--------------------------------------------------------------------------

// Contact

router.get("/contact", _getContact);
router.post(
  "/contact",
  [
    check("email", "email field is required").isLength({ min: 3 }),
    check("massage", "massage field is required").isLength({ min: 3 }),
  ],
  _saveContact
);
router.put(
  "/contact/:id",
  [
    check("email", "email field is required").isLength({ min: 3 }),
    check("massage", "massage field is required").isLength({ min: 3 }),
  ],
  _putContact
);
router.delete("/contact/:id", _deleteContact);
//--------------------------------------------------------------------------

//  News

router.get("/news", _getNews);
router.post(
  "/news",
  [check("email", "email field is required").isLength({ min: 3 })],
  _saveNews
);
router.put(
  "/news/:id",
  [check("email", "email field is required").isLength({ min: 3 })],
  _putNews
);
router.delete("/news/:id", _deleteNews);

// ---------------------------------------------------------------------

// Like

router.get("/like", _getLike);
router.post("/like", _saveLike);
router.put("/like/:id", _putLike);
router.delete("/like/:id", _deleteLike);

//---------------------------------------------------------------------

// orders

router.get("/orders", _getOrders);
router.post("/orders", _saveOrders);
router.put("/orders/:id", _putOrders);
router.delete("/orders/:id", _deleteOrders);

// --------------------------------------------------------------------

// comment

router.get("/comment", _getComment);
router.post(
  "/comment",
  [
    check("comment", "comment field is required").isLength({ min: 3 }),
    check("date", "date field is required").isLength({ min: 3 }),
  ],
  _saveComment
);
router.put(
  "/comment/:id",
  [
    check("comment", "comment field is required").isLength({ min: 3 }),
    check("date", "date field is required").isLength({ min: 3 }),
  ],
  _putComment
);
router.delete("/comment/:id", _deleteComment);
//-----------------------------------------------------------------------------

// categories

router.get("/categories", _getCategories);
router.post("/categories", upload.single("logo"), _saveCategory);
router.put("/categories/:id", upload.single("logo"), _putCategory);
router.delete("/categories/:id", upload.single("logo"), _deleteCategory);

//------------------------------------------------------------------
module.exports = router;
