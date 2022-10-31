const connection = require("../connection/connection");

const _getSave = (req, res) => {
  let sql = `select * from save`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _InsertSave = (req, res) => {
  let sql = `select * from save`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _putSave = (req, res) => {
  let sql = `select * from save`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _deleteSave = (req, res) => {
  let sql = `select * from save`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  _getSave,
};
