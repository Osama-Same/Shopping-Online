const connection = require("../connection/connection");

const _getProducts = (req, res) => {
  let sql = `select * from post`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  _getProducts,
};
