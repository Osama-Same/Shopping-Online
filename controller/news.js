const connection = require("../connection/connection");

const _getNews = (req, res) => {
  let sql = `select * from news`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
    _getNews,
};
