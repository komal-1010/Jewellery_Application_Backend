const { response } = require("express");
const db = require("../db/db");
const { Bannermodel } = require("../models/Bannermodel");

const {
  execute_query,
  imgupload,
  imgdelete,
  IMG_URL,
} = require("../routes/global");
const multer = require("multer");

exports.bannermastertbl = async (req, res) => {
  let sql = `CREATE TABLE ${new Bannermodel().tablename}(
      ${Object.entries(new Bannermodel().data[0])
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
      msg: `${new Bannermodel().tablename} table created successfuly`,
      data: [],
    };
    res.json(data);
  });
};

exports.insertbannerdata = async (req, res) => {
  const data = req.body;
  // let imgdata = imgupload(data.imgdata, "Uploads/Banner/");
  let data2 = {
    bid: data.bid,
    btype: data.btype,
    remark: data.remark,
    imgdata: data.imgdata,
  };

  // let sql = `INSERT INTO ${new StatuslikemasterModel().tablename} SET ?`;
  let dt = JSON.stringify(data2);
  let sdt = dt.replace(/\\/g, "");

  let sql = `CALL sp_banner(?,?)`;
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

exports.bannerimgupload = async (request, response) => {
  let stslinkArray = [];
  var storage = multer.diskStorage({
    destination: function (request, file, callback) {
      callback(null, "./Uploads/Banner");
    },
    filename: function (request, file, callback) {
      var temp_file_arr = file.originalname.split(".");
      var temp_file_type = file.mimetype;
      var temp_file_name = `banner_`;

      var temp_file_extension = temp_file_arr[1];
      var fname = temp_file_name + "" + Date.now() + "." + temp_file_extension;
      callback(
        null,
        temp_file_name + "" + Date.now() + "." + temp_file_extension
      );
      stslink = {
        id: Date.now(),
        imglink: IMG_URL + "Uploads/Banner/" + fname,
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
    } else {
      let data = {
        code: 200,
        data: stslinkArray,
        msg: "File upload done",
      };
      return response.json(data);
    }
  });
};
exports.insertbannerdata = async (req, res) => {
  const data = req.body;
  // let imgdata = imgupload(data.imgdata, "Uploads/Category/");
  // let imgdata = this.catgimgupload(data.imgdata);
  let data2 = {
    bid: data.bid,
    btype: data.btype,
    remark: data.remark,
    imgdata: data.imgdata,
  };
  // let sql = `INSERT INTO ${new StatuslikemasterModel().tablename} SET ?`;
  let dt = JSON.stringify(data2);
  let sdt = dt.replace(/\\/g, "");

  let sql = `CALL sp_banner(?,?)`;
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
exports.updatebannermaster = async (req, res) => {
  const data = req.body;

  // let imgdata = imgupload(data.imgdata, "Uploads/Category/");
  let mode = 2;
  let data2 = {};
  // if (data.imgdata.length<= 0) {
  //   data2 = data;
  // } else {
  mode = 5;
  data2 = {
    bid: data.bid,
    btype: data.btype,
    remark: data.remark,
    imgdata: data.imgdata,
  };
  // }

  let dt = JSON.stringify(data2);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_banner(?,?)`;
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

exports.deletebannermaster = async (req, res) => {
  const data = req.body;
  let imgdata = imgupload(data.imgdata, "Uploads/Banner/");
  let data2 = {
    bid: data.bid,
    btype: data.btype,
    remark: data.remark,
    imgdata: imgdata,
  };

  let dt = JSON.stringify(data2);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_banner(?,?)`;
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

exports.Getbannermasterdata = async (req, res) => {
  const data = req.body;

  let whr = "";
  if (data.bid > 0) {
    whr += ` and bid = ${data.bid}`;
  }
  if (!data.btype == "") {
    whr += ` and btype = '${data.btype}'`;
  }
  let data1 = {
    whr: whr,
  };
  let dt = JSON.stringify(data1);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_banner(?,?)`;
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

exports.bannerimgdelete = async (req, res) => {
  const data = req.body;
  // console.log(data.imglink)
  let resdata = imgdelete("./Uploads/Banner/" + data.imglink);
  if (resdata == true) {
    const data1 = {
      code: 200,
      msg: "Image delete successfully",
    };
    return res.json(data1);
  } else {
    const data1 = {
      code: 100,
      msg: "something went wrong! please try again",
    };
    return res.json(data1);
  }
};
