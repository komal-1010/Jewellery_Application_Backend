const { response } = require("express");
const db = require("../db/db");
const { Customermodel } = require("../models/Customermodel");
const { Smsmodel } = require("../models/Smsmodel");
const { execute_query } = require("../routes/global");


  exports.smstbl = async (req, res) => {
    let sql = `CREATE TABLE ${new Smsmodel().tablename}(
      ${Object.entries(new Smsmodel().data[0])
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
        msg: `${new Smsmodel().tablename} table created successfuly`,
        data: [],
      };
      res.json(data);
    });
  };


  exports.insertsmsmasterdata = async (req, res) => {
    const data = req.body;
    let data2 = {
        smsid:data.smsid,
        sms:data.sms,
        smstype:data.smstype
    };
    // let sql = `INSERT INTO ${new StatuslikemasterModel().tablename} SET ?`;
    let dt = JSON.stringify(data2);
    let sdt = dt.replace(/\\/g, "");
    let sql = `CALL sp_smstemplate(?,?)`;
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

    exports.deletesmsmaster = async (req, res) => {
    const data = req.body;
    let data2 = {
        smsid:data.smsid,
        sms:data.sms,
        smstype:data.smstype
    };
  
      let dt = JSON.stringify(data2);
      let sdt = dt.replace(/\\/g, "");
      let sql = `CALL sp_smstemplate(?,?)`;
      const resdata = await execute_query(sql, sdt, 3);
      if (resdata.code == 500) 
      {
        return res.json(resdata);
      } 
      else  
      {
        const data1 =
        {
        code: 200,
        msg: "Record deleted successfully",
        };
        return res.json(data1);
      }
    };
      exports.Getsmsdata = async (req, res) => {
        const data = req.body;
        
        let whr = "";
        if (data.smsid >0) 
        {
            whr += ` and smstid = '${data.smstid}'`;
        }
        let data1 = 
        {
            whr: whr,
        };
        let dt = JSON.stringify(data);
        let sdt = dt.replace(/\\/g, "");
        let sql = `CALL sp_smstemplate(?,?)`;
        const resdata = await execute_query(sql, sdt, 4);
        if (resdata.code == 500)
        {
            return res.json(resdata);
        } else 
        {
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
      
    