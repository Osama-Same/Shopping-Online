const connection = require("../connection/connection");

const _getCategories = (req, res) => {
  let sql = `select * from category`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  _getCategories,
};