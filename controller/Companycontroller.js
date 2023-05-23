const { response } = require("express");
const db = require("../db/db");
const { Companymodel } = require("../models/Companymodel");



const { execute_query, imgupload, imgdelete } = require("../routes/global");


  exports.companymastertbl = async (req, res) => {
    let sql = `CREATE TABLE ${new Companymodel().tablename}(
      ${Object.entries(new Companymodel().data[0])
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
        msg: `${new Companymodel().tablename} table created successfuly`,
        data: [],
      };
      res.json(data);
    });
  };


  exports.insertcompanydata = async (req, res) => {
    const data = req.body;
    let imgdata = imgupload(data.cmplogo, "Uploads/companymaster/");
    let data2 = {
      cmpid: data.cmpid,
      cmpname: data.cmpname,
      ownername: data.ownername,
      cmpaddress: data.cmpaddress,
      mob:data.mob,
      wmob: data.wmob,
      weblink: data.weblink,
      cemail: data.cemail,
      officeno: data.officeno,
      devoheding: data.devoheding,
      cmplogo: imgdata,
    
    };
    // let sql = `INSERT INTO ${new StatuslikemasterModel().tablename} SET ?`;
    let dt = JSON.stringify(data2);
    let sdt = dt.replace(/\\/g, "");
    
    let sql = `CALL sp_companymaster(?,?)`;
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
  exports.updatecompanymaster = async (req, res) => {
    const data = req.body;
    let imgdata = imgupload(data.cmplogo, "Uploads/companymaster/");
    // console.log(imgdata);
    let mode=2;
    let data2={};
    if(imgdata.code==500){
      data2=data;
    }else
    {
      mode=5;
       data2 = {
        cmpid: data.cmpid,
        cmpname: data.cmpname,
        ownername: data.ownername,
        cmpaddress: data.cmpaddress,
        mob:data.mob,
        wmob: data.wmob,
        weblink: data.weblink,
        cemail: data.cemail,
        officeno: data.officeno,
        devoheding: data.devoheding,
        cmplogo: imgdata,
      
      };
    }
  let dt = JSON.stringify(data2);
    let sdt = dt.replace(/\\/g, "");
    let sql = `CALL sp_companymaster(?,?)`;
    const resdata = await execute_query(sql, sdt, mode);
    if (resdata.code == 500) {
  return res.json(resdata);
    } else {
  const data1 = {
  code: 200,
  msg: "Record updated successfully",
  };  return res.json(data1);
  }
    };
    exports.deletecompanymaster = async (req, res) => {
      const data = req.body;
      let imgdata = imgupload(data.imgdata, "Uploads/companymaster/");
    let data2 = {
      cmpid: data.cmpid,
      cmpname: data.cmpname,
      ownername: data.ownername,
      cmpaddress: data.cmpaddress,
      mob:data.mob,
      wmob: data.wmob,
      weblink: data.weblink,
      cemail: data.cemail,
      officeno: data.officeno,
      devoheding: data.devoheding,
      cmplogo: imgdata,
    
    };
  
      let dt = JSON.stringify(data2);
      let sdt = dt.replace(/\\/g, "");
      let sql = `CALL sp_companymaster(?,?)`;
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
      exports.GetComapnymasterdata = async (req, res) => {
        const data = req.body;
        
        let whr = "";
        if (data.cmpid >0) {
            whr += ` and cmpid = '${data.cmpid}'`;
      }
        let data1 = {
            whr: whr,
      };
        let dt = JSON.stringify(data);
        let sdt = dt.replace(/\\/g, "");
        let sql = `CALL sp_companymaster(?,?)`;
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
        exports.companymasterimgdelete = async (req, res) => {
          const data = req.body;
          let resdata = imgdelete("./" + data.imgurl);
          if (resdata == true) {
            const data1 = {
              code: 200,
              msg: "Image delete successfully",
            };
            return res.json(data1);
          } else {
            const data1 = {
              code: 100,
              msg: "something went wrong! please try agian",
            };
            return res.json(data1);
          }
        };  
    