const { response } = require("express");
const db = require("../db/db");
const { Subcategorymodel } = require("../models/Subcategorymodel");


const { execute_query, imgupload, imgdelete } = require("../routes/global");


  exports.subcategorymastertbl = async (req, res) => {
    let sql = `CREATE TABLE ${new Subcategorymodel().tablename}(
      ${Object.entries(new Subcategorymodel().data[0])
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
        msg: `${new Subcategorymodel().tablename} table created successfuly`,
        data: [],
      };
      res.json(data);
    });
  };


  exports.insertsubcategorydata = async (req, res) => {
    const data = req.body;
    let imgdata = imgupload(data.imgdata, "Uploads/Subcategory/");
    let data2 = {
      subcatgid: data.subcatgid,
      catgid:data.catgid,
      subcatgname: data.subcatgname,
      imgdata: imgdata,
      isactive:data.isactive,
      
    };
    // let sql = `INSERT INTO ${new StatuslikemasterModel().tablename} SET ?`;
    let dt = JSON.stringify(data2);
    let sdt = dt.replace(/\\/g, "");
    
    let sql = `CALL sp_subcategory(?,?)`;
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
  exports.updatesubcategorymaster = async (req, res) => {
    const data = req.body;
    let imgdata = imgupload(data.imgdata, "Uploads/Subcategory/");
    let mode=2;
    let data2={};
    if(imgdata.code==500){
      data2=data;
    }else
    {
      mode=5;
      data2 = {
        subcatgid: data.subcatgid,
        catgid:data.catgid,
        subcatgname: data.subcatgname,
        imgdata: imgdata,
        isactive:data.isactive,
        
      };
    }
    
    
    let dt = JSON.stringify(data2);
    let sdt = dt.replace(/\\/g, "");
    let sql = `CALL sp_subcategory(?,?)`;
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
  
  exports.deletesubcategorymaster = async (req, res) => {
    const data = req.body;
    let imgdata = imgupload(data.imgdata, "Uploads/Subcategory/");
    let data2 = {
      subcatgid: data.subcatgid,
      catgid:data.catgid,
      subcatgname: data.subcatgname,
      imgdata: imgdata,
      isactive:data.isactive,
      
    };

    let dt = JSON.stringify(data2);
    let sdt = dt.replace(/\\/g, "");
    let sql = `CALL sp_subcategory(?,?)`;
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
  
  exports.Getsubcategorymasterdata = async (req, res) => {
    const data = req.body;
    
    let whr = "";
    if (data.subcatgid >0) {
      whr += ` and subcatgid = ${data.subcatgid}`;
}
if (!data.subcatgname =="") {
  whr += ` and subcatgname = '${data.subcatgname}'`;
}
    let data1 = {
        whr: whr,
  };
    let dt = JSON.stringify(data1);
    let sdt = dt.replace(/\\/g, "");
    let sql = `CALL sp_subcategory(?,?)`;
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
  
    exports.subcategoryimgdelete = async (req, res) => {
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