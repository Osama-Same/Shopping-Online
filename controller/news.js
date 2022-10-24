const connection = require("../connection/connection");
const { validationResult } = require("express-validator");
const _getN = (req, res) => {
  const sql = `select * from news`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _saveN = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ error: error.array()[0].msg });
  }
  let email = req.body.email;
  const sql = `INSERT INTO news ( email ) VALUES ('${email}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json({ err: "You have entered invalid  Email" });
    } else {
      res.json({ result: "Your message was sent successfully" });
    }
  });
};
module.exports = {
  _getN,
  _saveN,
};
