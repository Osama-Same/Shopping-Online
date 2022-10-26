const connection = require("../connection/connection");

const _getComment = (req, res) => {
  let sql = `select * from comment `;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  _getComment,
};
