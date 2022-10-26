const connection = require("../connection/connection");

const _getLike = (req, res) => {
  let sql = `select * from likee`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  _getLike,
};
