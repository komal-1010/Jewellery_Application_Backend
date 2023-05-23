const db = require("../db/db");


exports.createdb = (res,req) => {
    let sql = "CREATE DATABASE vjweb";
    db.query(sql, (err) => {
      if (err) {
        throw err;
      }
      let data = [
        {
          code: 200,
          msg: `Database created successfuly`,
          data: [],
        },
      ];
      res.send(json(data));
    });
  };
  