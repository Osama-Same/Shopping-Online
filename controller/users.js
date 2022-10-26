const connection = require("../connection/connection");

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

module.exports = {
  _getUsers,
};
