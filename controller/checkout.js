const connection = require("../connection/connection");
const { validationResult } = require("express-validator");

const _getCheckOut = (req, res) => {
  let sql = `select * from checkOut `;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _saveCheckOut = (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.json({ error: error.array()[0].msg });
  }
  let iduser = req.body.iduser;
  let priceOut = req.body.priceOut;
  let creditCardNumber = req.body.CreditCardNumber;
  let expMonth = req.body.expMonth;
  let cvv = req.body.cvv;
  let sql = `insert into checkOut (iduser,priceOut,CreditCardNumber,expMonth,cvv)
  VALUES('${iduser}','${priceOut}','${creditCardNumber}','${expMonth}', '${cvv}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
module.exports = {
  _getCheckOut,
  _saveCheckOut,
};
