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
  const sql = `INSERT INTO likee ( iduser , idproduct , likee) VALUES ('${iduser}' ,'${idproduct}' , '${likee}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } 
    
    if(result){
      res.json(result);
    }
  });
};

const _putLike = (req, res) => {
  let iduser = req.params.iduser;
  let idpost = req.body.idpost;
  let likee = req.body.likee;
  const sql = `UPDATE likee
  SET iduser = '${iduser}',
  idpost = '${idpost}',
  likee = '${likee}'
  WHERE iduser = '${iduser}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _deleteLike = (req, res) => {
  let iduser = req.params.iduser;
  const sql = `DELETE FROM likee  WHERE id = '${iduser}'`;
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
