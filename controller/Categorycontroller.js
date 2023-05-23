const { response, request } = require("express");
const db = require("../db/db");
const { Categorymodel } = require("../models/Categorymodel");

const multer = require("multer");
const { execute_query, imgupload, imgdelete, IMG_URL } = require("../routes/global");

exports.categorymastertbl = async (req, res) => {
  let sql = `CREATE TABLE ${new Categorymodel().tablename}(
      ${Object.entries(new Categorymodel().data[0])
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
      msg: `${new Categorymodel().tablename} table created successfuly`,
      data: [],
    };
    res.json(data);
  });
};

exports.catgimgupload = async (request, response) => {
  let stslinkArray = [];
  var storage = multer.diskStorage({
    destination: function (request, file, callback) {
      callback(null, "./Uploads/Category");
    },
    filename: function (request, file, callback) {
      var temp_file_arr = file.originalname.split(".");
      var temp_file_type = file.mimetype;
      var temp_file_name = `catg_`;

      var temp_file_extension = temp_file_arr[1];
      var fname = temp_file_name + "" + Date.now() + "." + temp_file_extension;
      callback(
        null,
        temp_file_name + "" + Date.now() + "." + temp_file_extension
      );
      stslink = {
        id: Date.now(),
        imglink:IMG_URL+"Uploads/Category/"+ fname,
        media_type: temp_file_type,
      };
      stslinkArray.push(stslink);
    },
  });
  var upload = multer({ storage: storage, uid: "2" }).array("file[]");

  upload(request, response, function (error) {
    if (error) {
      let data = {
        code: 100,
        msg: "File not upload",
      };
      return response.json(data);
    }else{
      let data = {
        code: 200,
        data:stslinkArray,
        msg: "File upload done",
      };
      return response.json(data);
    }
  });
};
exports.insertcategorydata = async (req, res) => {
  const data = req.body;
  // let imgdata = imgupload(data.imgdata, "Uploads/Category/");
  // let imgdata = this.catgimgupload(data.imgdata);
  let data2 = {
    catgid: data.catgid,
    catgname: data.catgname,
    imgdata: data.imgdata,
    isactive: data.isactive,
  };
  // let sql = `INSERT INTO ${new StatuslikemasterModel().tablename} SET ?`;
  let dt = JSON.stringify(data2);
  let sdt = dt.replace(/\\/g, "");

  let sql = `CALL sp_category(?,?)`;
  const resdata = await execute_query(sql, sdt, 1);
  if (resdata.code == 500) {
    return res.json(resdata);
  } else if (resdata.code == 600) {
    return res.json(resdata);
  } else {
    const data1 = { code: 200, msg: "data inserted sucessfully" };
    return res.json(data1);
  }
};

exports.updatecategorymaster = async (req, res) => {
  const data = req.body;

  // let imgdata = imgupload(data.imgdata, "Uploads/Category/");
  let mode = 2;
  let data2 = {};
  // if (data.imgdata.length<= 0) {
  //   data2 = data;
  // } else {
    mode = 5;
    data2 = {
      catgid: data.catgid,
      catgname: data.catgname,
      imgdata: data.imgdata,
      isactive: data.isactive,
    };
  // }

  let dt = JSON.stringify(data2);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_category(?,?)`;
  const resdata = await execute_query(sql, sdt, mode);
  if (resdata.code == 500) {
    return res.json(resdata);
  } else {
    const data1 = {
      code: 200,
      msg: "Record updated successfully",
    };
    return res.json(data1);
  }
};

exports.deletecategorymaster = async (req, res) => {
  const data = req.body;
  let imgdata = imgupload(data.imgdata, "Uploads/Category/");
  let data2 = {
    catgid: data.catgid,
    catgname: data.catgname,

    imgdata: imgdata,
    isactive: data.isactive,
  };

  let dt = JSON.stringify(data2);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_category(?,?)`;
  const resdata = await execute_query(sql, sdt, 3);
  if (resdata.code == 500) {
    return res.json(resdata);
  } else {
    const data1 = {
      code: 200,
      msg: "Record deleted successfully",
    };
    return res.json(data1);
  }
};

exports.Getcategorymasterdata = async (req, res) => {
  const data = req.body;

  let whr = "";
  if (data.catgid > 0) {
    whr += ` and catgid = ${data.catgid}`;
  }
  if (!data.catgname == "") {
    whr += ` and catgname = '${data.catgname}'`;
  }
  let data1 = {
    whr: whr,
  };
  let dt = JSON.stringify(data1);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_category(?,?)`;
  const resdata = await execute_query(sql, sdt, 4);
  if (resdata.code == 500) {
    return res.json(resdata);
  } else {
    if (!resdata[0][0]) {
      const data1 = {
        code: 300,
        msg: "Data not found",
        data: [],
      };
      return res.json(data1);
    }
    const data1 = {
      code: 200,
      data: resdata[0],
      msg: "Data found",
    };
    return res.json(data1);
  }
};
exports.categoryimgdelete = async (req, res) => {
  const data = req.body;
  // console.log(data.imglink)
  let resdata = imgdelete("./Uploads/Category/"+data.imglink);
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
