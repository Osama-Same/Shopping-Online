const connection = require("../connection/connection");
const cloudinary = require("../connection/cloudinary");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");


const _getUsers = (req, res) => {
  let sql = `select * from users`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _saveUser = async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ error: error.array()[0].msg });
  }
  let name = req.body.name;
  let email = req.body.email;
  let password = req.body.password;
  let phone = req.body.phone;
  let img = null;
  if (req.file) {
    img = await cloudinary.uploader.upload(req.file.path, {
      folder: "CRUD/User",
    });
  }
  let image = img?.secure_url;
  let cloudinary_id = img?.public_id;
  password = bcrypt.hashSync(password, Number("salt"));
  const sql = `INSERT INTO users (name, email, password,phone,image ,cloudinary_id , authorization)
    VALUES ('${name}', '${email}', '${password}','${phone}','${image}','${cloudinary_id}' , 'user')`;

  connection.query(sql, (err, result) => {
    if (err) {
      res.json({ err: " You have entered invalid  Email" });
    }
    if (result) {
      res.json({ result: "User Register sucessfully" });

    }
  });
};
module.exports = {
  _getUsers,
  _saveUser
};
