const connection = require("../connection/connection");

const _getContact = (req, res) => {
  let sql = `select * from contact`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  _getContact,
};
