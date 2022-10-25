const connection = require("../connection/connection");

const _getOR = (req, res) => {
  const sql = `select * from orders `;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const _saveOR = (req, res) => {
  const iduser = req.body.iduser;
  const idpost = req.body.idpost;
  const quantity = req.body.quantity;
  const sql = ` INSERT INTO orders (iduser ,idpost , quantity)VALUES
    ('${iduser}' , '${idpost}' , '${quantity}')`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

const _putOR = (req, res) => {
  const id = req.params.id;
  const iduser = req.body.iduser;
  const idpost = req.body.idpost;
  const quantity = req.body.quantity;

  let sql = `update orders set 
    iduser = '${iduser}',
    idpost = '${idpost}',
    quantity = '${quantity}'
    where id = '${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};
const _deleteLOR = (req, res) => {
  const id = req.params.id;
  let sql = `select * from orders where id='${id}'`;
  connection.query(sql, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  _getOR,
  _saveOR,
  _putOR,
  _deleteLOR,
};
