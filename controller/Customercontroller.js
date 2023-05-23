const { response } = require("express");
const db = require("../db/db");

const { Customermodel } = require("../models/Customermodel");



const { execute_query, imgupload, imgdelete } = require("../routes/global");


  exports.customertbl = async (req, res) => {
    let sql = `CREATE TABLE ${new Customermodel().tablename}(
      ${Object.entries(new Customermodel().data[0])
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
        msg: `${new Customermodel().tablename} table created successfuly`,
        data: [],
      };
      res.json(data);
    });
  };


  exports.insertcustomerdata = async (req, res) => {
    const data = req.body;
    // let imgdata = imgupload(data.cmplogo, "Uploads/companymaster/");
    let data2 = {
        custid:data.custid,
        custname:data.custname,
        mob:data.mob,
        wmob:data.wmob,
        gender:data.gender,
        dob:data.dob,
        address:data.address,
    
    };
    // let sql = `INSERT INTO ${new StatuslikemasterModel().tablename} SET ?`;
    let dt = JSON.stringify(data);
    let sdt = dt.replace(/\\/g, "");
    
    let sql = `CALL sp_customermaster(?,?)`;
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
  exports.
  updatecustomermaster = async (req, res) => {
    const data = req.body;
    let dt = JSON.stringify(data);
    let sdt = dt.replace(/\\/g, "");
    let sql = `CALL sp_customermaster(?,?)`;
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



    exports.deletecustomermaster = async (req, res) => {
      const data = req.body;
    //   let imgdata = imgupload(data.imgdata, "Uploads/companymaster/");
    let data2 = {
        custid:data.custid,
        custname:data.custname,
        mob:data.mob,
        wmob:data.wmob,
        gender:data.gender,
        dob:data.dob,
        address:data.address,
    };
  
      let dt = JSON.stringify(data);
      let sdt = dt.replace(/\\/g, "");
      let sql = `CALL sp_customermaster(?,?)`;
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
      exports.GetCustomermasterdata = async (req, res) => {
        const data = req.body;
        
        let whr = "";
        if (data.custid >0) {
            whr += ` and custid = '${data.custid}'`;
      }
        let data1 = {
            whr: whr,
      };
        let dt = JSON.stringify(data);
        let sdt = dt.replace(/\\/g, "");
        let sql = `CALL sp_customermaster(?,?)`;
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
        // exports.companymasterimgdelete = async (req, res) => {
        //   const data = req.body;
        //   let resdata = imgdelete("./" + data.imgurl);
        //   if (resdata == true) {
        //     const data1 = {
        //       code: 200,
        //       msg: "Image delete successfully",
        //     };
        //     return res.json(data1);
        //   } else {
        //     const data1 = {
        //       code: 100,
        //       msg: "something went wrong! please try agian",
        //     };
        //     return res.json(data1);
        //   }
        // };  
    