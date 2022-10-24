const connection = require("../connection/connection");
const { validationResult } = require("express-validator");

const _getC = (req, res) => {
  const sql = `select * from contact`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _saveC = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ error: error.array()[0].msg });
  }
  let email = req.body.email;
  let massage = req.body.massage;
  const sql = `INSERT INTO contact ( email , massage) VALUES ('${email}', '${massage}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json({ err: "Error" });
      console.log({ err: "Error" });
    } else {
      res.json({ result: "Your message was sent successfully" });
    }
  });
};
module.exports = {
  _getC,
  _saveC,
};
