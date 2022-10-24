const connection = require("../connection/connection");

const _getCO = (req, res) => {
  const sql = `select * from comment `;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const _saveCO = (req, res) => {
  let idUser = req.body.idUser;
  let idpost = req.body.idpost;
  let comment = req.body.comment;
  let date = req.body.date;
  let sql = `insert into comment (idUser,idpost,comment,date)VALUES('${idUser}','${idpost}','${comment}','${date}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
      console.log(err);
    } else {
      res.json(result);
      console.log(result);
    }
  });
};

module.exports = { _getCO, _saveCO };
