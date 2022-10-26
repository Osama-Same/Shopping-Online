const connection = require("../connection/connection");

const _getOrders = (req, res) => {
  let sql = `select * from orders`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  _getOrders,
};
