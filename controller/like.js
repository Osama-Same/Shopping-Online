const connection = require("../connection/connection");

const _getL = (req, res) => {
  const sql = `select * from likee `;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const _saveL = (req, res) => {
  const iduser = req.body.iduser;
  const idpost = req.body.idpost;
  const likee = req.body.likee;
  const sql = ` INSERT INTO likee (iduser ,idpost , likee)VALUES
  ('${iduser}' , '${idpost}' , '${likee}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _putL = (req, res) => {
  const id = req.params.id;
  const iduser = req.body.iduser;
  const idpost = req.body.idpost;
  const likee = req.body.likee;

  let sql = `update likee set 
  iduser = '${iduser}',
  idpost = '${idpost}',
  likee = '${likee}'
  where id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  _getL,
  _saveL,
  _putL,
};
