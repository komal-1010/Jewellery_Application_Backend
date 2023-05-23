const multer = require("multer");
const db = require("../db/db");
// const nodemailer = require("nodemailer");
const { ImageuploadMaster } = require("../models/ImageuploadMaster");
const {
  execute_query,
  imgupload,
  imgdelete,
  IMG_URL,
} = require("../routes/global");

exports.ImageUploadTbl = async (req, res) => {
  let sql = `CREATE TABLE ${new ImageuploadMaster().tablename}(
${Object.entries(new ImageuploadMaster().data[0])
  .map((k) => k.toString().replace(",", " "))
  .join(", ")}
)`;
  db.query(sql, (err) => {
    if (err) {
      res.json({ code: err.code, msg: err.sqlMessage });
    }
    let data = {
      code: 200,
      msg: "Table Created Successfully",
    };
    res.json(data);
  });
};

exports.Saveimageupload = async (req, res) => {
  const data = req.body;
  let data2 = {
    imgpath: data.imgpath,
    imgtype: data.imgtype,
    imgname: data.imgname,
    uid: data.uid,
  };
  let dt = JSON.stringify(data2);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_ImageuploadMaster(?,?)`;
  const resdata = await execute_query(sql, sdt, 1);
  if (resdata.code == 500) {
    return res.json(resdata);
  } else {
    const data1 = {
      code: 200,
      msg: "Record saved successfully",
    };
    return res.json(data1);
  }
};

exports.Imgupload = async (request, response) => {
  let stslinkArray = [];
  var storage = multer.diskStorage({
    destination: function (request, file, callback) {
      callback(null, "./Uploads/Product");
    },
    filename: function (request, file, callback) {
      var temp_file_arr = file.originalname.split(".");
      var temp_file_type = file.mimetype;
      var temp_file_name = `img_`;

      var temp_file_extension = temp_file_arr[1];
      var fname = temp_file_name + "" + Date.now() + "." + temp_file_extension;
      callback(
        null,
        // file.originalname
        temp_file_name + "" + Date.now() + "." + temp_file_extension
      );
      stslink = {
        id: Date.now(),
        imglink:IMG_URL+"Uploads/Product/"+ fname,
        media_type: temp_file_type,
        file_name:file.originalname
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

exports.Deleteimageupload = async (req, res) => {
  const data = req.body;
  let imgret = imgdelete("./" + data.imgurl);
  let dt = JSON.stringify(data);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_ImageuploadMaster(?,?)`;
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

exports.Getimageupload = async (req, res) => {
  const data = req.body;
  let whr = "";
  if (!data.imgid == "") {
    whr += ` and imgid = '${data.imgid}'`;
  }
  if (!data.imgname == "") {
    whr += ` and imgname = '${data.imgname}'`;
  }
  if (!data.uid == "") {
    whr += ` and uid = '${data.uid}'`;
  }
  let data1 = {
    whr: whr,
  };
  let dt = JSON.stringify(data1);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_ImageuploadMaster(?,?)`;
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


