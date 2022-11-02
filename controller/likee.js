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

const _saveLike = (req, res) => {
  let iduser = req.body.iduser;
  let idproduct = req.body.idproduct;
  let likee = req.body.likee;
  let likeNum = req.body.likeNum;
  const sql = `INSERT INTO likee ( iduser , idproduct , likee ,likeNum) VALUES ('${iduser}' ,'${idproduct}' , '${likee}' ,'${likeNum}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _putLike = (req, res) => {
  let id = req.params.id;
  let iduser = req.body.iduser;
  let idpost = req.body.idpost;
  let likee = req.body.likee;
  const sql = `UPDATE likee
  SET iduser = '${iduser}',
  idpost = '${idpost}',
  likee = '${likee}'
  WHERE id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _deleteLike = (req, res) => {
  let id = req.params.id;
  const sql = `DELETE FROM likee  WHERE id = '${id}'`;
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
  _saveLike,
  _putLike,
  _deleteLike,
};
