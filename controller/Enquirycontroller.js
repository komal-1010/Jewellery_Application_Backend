const { response } = require("express");
const db = require("../db/db");

const { enquirymodel } = require("../models/enquirymodel");



const { execute_query, imgupload, imgdelete } = require("../routes/global");


  exports.enquirytbl = async (req, res) => {
    let sql = `CREATE TABLE ${new enquirymodel().tablename}(
      ${Object.entries(new enquirymodel().data[0])
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
        msg: `${new enquirymodel().tablename} table created successfuly`,
        data: [],
      };
      res.json(data);
    });
  };


  exports.insertenquirydata = async (req, res) => {
    const data = req.body;
    // let imgdata = imgupload(data.cmplogo, "Uploads/companymaster/");
    let data2 = {
        // enqid:data.enqid,
        logid:data.logid,
        edate:data.edate,
        pdetail: data.pdetail,
        descr: data.descr,
    };
    // let sql = `INSERT INTO ${new StatuslikemasterModel().tablename} SET ?`;
    let dt = JSON.stringify(data2);
    let sdt = dt.replace(/\\/g, "");
    
    let sql = `CALL sp_enquirymaster(?,?)`;
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
  exports.updateenquirydata = async (req, res) => {
    const data = req.body;
    let dt = JSON.stringify(data);
    let sdt = dt.replace(/\\/g, "");
    let sql = `CALL sp_enquirymaster(?,?)`;
    const resdata = await execute_query(sql, sdt, 2);
    if (resdata.code == 500) {
  return res.json(resdata);
    } else {
  const data1 = {
  code: 200,
  msg: "Record updated successfully",
  };  return res.json(data1);
  }
    };



    exports.deleteenquirydata = async (req, res) => {
      const data = req.body;
    //   let imgdata = imgupload(data.imgdata, "Uploads/companymaster/");
    let data2 = {
        name:data.name,
        mob:data.mob,
        date:data.date,
        pdetail: data.pdetail,
        descr: data.descr,
        otp: data.otp,
    
    };
  
      let dt = JSON.stringify(data);
      let sdt = dt.replace(/\\/g, "");
      let sql = `CALL sp_enquirymaster(?,?)`;
      const resdata = await execute_query(sql, sdt, 3);
      if (resdata.code == 500) {
    return res.json(resdata);
      } else {
    const data1 = {
    code: 200,
    msg: "Record deleted successfully",
    };  return res.json(data1);
    }
      };


      exports.Getenquirydata = async (req, res) => {
        const data = req.body;
        
        let whr = "";
        if (data.enqid >0) {
            whr += ` and enqid = '${data.enqid}'`;
      }
      if (data.edate >0) {
        whr += ` and edate = '${data.edate}'`;
  }
  if (data.logid >0) {
    whr += ` and logid = '${data.logid}'`;
}
        let data1 = {
            whr: whr,
      };
        let dt = JSON.stringify(data1);
        let sdt = dt.replace(/\\/g, "");
        let sql = `CALL sp_enquirymaster(?,?)`;
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
   
    