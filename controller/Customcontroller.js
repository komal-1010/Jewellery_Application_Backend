const { response } = require("express");
const db = require("../db/db");
const { Custommodel } = require("../models/Custommodel");


const { execute_query } = require("../routes/global");


  exports.customsettingtbl = async (req, res) => {
    let sql = `CREATE TABLE ${new Custommodel().tablename}(
      ${Object.entries(new Custommodel().data[0])
        .map((k) => k.toString().replace(",", " "))
        .join(", ")}
       
    )`;
    db.query(sql, (err) => {
      if (err) {
        // throw err;
        res.json({ code: err.code, msg: err.sqlMessage });
      }
      let data = {
        code: 200,
        msg: `${new Custommodel().tablename} table created successfuly`,
        data: [],
      };
      res.json(data);
    });
  };


  exports.insertlogindata = async (req, res) => {
    const data = req.body;
  
    // let sql = `INSERT INTO ${new StatuslikemasterModel().tablename} SET ?`;
    let dt = JSON.stringify(data);
    let sdt = dt.replace(/\\/g, "");
    
    let sql = `CALL sp_login(?,?)`;
    const resdata=await execute_query(sql,sdt,1);
    if(resdata.code==500){
        return res.json(resdata);
    }else if(resdata.code==600)
    {
        return res.json(resdata);
    }
    else
    {
        const data1={code:200,msg:"data inserted sucessfully"}
        return res.json(data1);
    }

  } 
  exports.Getcustommasterdata = async (req, res) => {
    const data = req.body;
    
    let whr = "";
    if (data.sname >0) {
      whr += ` and sname = ${data.sname}`;
}
if (!data.customwhr == "") {
  whr +=  ` ${data.customwhr} `;

}
    let data1 = {
        whr: whr,
  };
    let dt = JSON.stringify(data1);
    let sdt = dt.replace(/\\/g, "");
    let sql = `CALL sp_customsetting(?,?)`;
    const resdata = await execute_query(sql, sdt, 4);
    if (resdata.code == 500) {
  return res.json(resdata);
    } else {
  if (!resdata[0][0]) {
    const data1 = {
  code: 300,
  msg: "Data not found",
  data:[], 
  };
  return res.json(data1);
  };
    const data1 = {
  code: 200,
  data: resdata[0],
  msg: "Data found",};
    return res.json(data1);
  }
    };