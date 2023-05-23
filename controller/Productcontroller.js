const { response } = require("express");
const db = require("../db/db");
const multer = require("multer");

// const { loginmodel } = require("../models/loginmodel");
const { Productmodel } = require("../models/Productmodel");

const { execute_query, imgupload, imgdelete, IMG_URL } = require("../routes/global");

exports.producttbl = async (req, res) => {
  let sql = `CREATE TABLE ${new Productmodel().tablename}(
      ${Object.entries(new Productmodel().data[0])
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
      msg: `${new Productmodel().tablename} table created successfuly`,
      data: [],
    };
    res.json(data);
  });
};

exports.insertproductdata = async (req, res) => {
  const data = req.body;
  let data2 = {
    prodid: data.prodid,
    catgid: data.catgid,
    title: data.title,
    decr: data.decr,
    offer: data.offer,
    pricedetail: data.pricedetail,
    imgdata: data.imgdata,
    isactive: data.isactive,
    type: data.type,
    flag: data.flag,
    gender: data.gender,
  };

  // let sql = `INSERT INTO ${new StatuslikemasterModel().tablename} SET ?`;
  let dt = JSON.stringify(data2);
  let sdt = dt.replace(/\\/g, "");

  let sql = `CALL sp_product(?,?)`;
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

exports.updateproductmaster = async (req, res) => {
  const data = req.body;
  // let imgdata = imgupload(data.imgdata, "Uploads/product/");
  // console.log(imgdata);
  let mode = 2;
  let data2 = {};    
    mode = 2;
    data2 = {
      prodid: data.prodid,
      catgid: data.catgid,
      title: data.title,
      decr: data.decr,
      offer: data.offer,
      pricedetail: data.pricedetail,
      imgdata: data.imgdata,
      isactive: data.isactive,
      type: data.type,
      flag: data.flag,
      gender: data.gender,
    };
  
  // console.log(mode);
  let dt = JSON.stringify(data2);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_product(?,?)`;
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

exports.deleteproductmaster = async (req, res) => {
  const data = req.body;
  // let imgdata = JSON.parse(data.imgdata);
  // imgdata.forEach((element) => {
  //   let resdata = imgdelete("./" + element.imglink);
  // });
  let data1 = { prodid: data.prodid };
  let dt = JSON.stringify(data1);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_product(?,?)`;
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

exports.Getproductmasterdata = async (req, res) => {
  const data = req.body;
  let whr = "";
  if (!data.prodid == "") {
    whr += ` and  productmaster.prodid = '${data.prodid}'`;
  }
  if (!data.catgid == "") {
    whr += ` and  productmaster.catgid = '${data.catgid}'`;
  }
  if (!data.gender == "") {
    whr += ` and  productmaster.gender = '${data.gender}'`;
  }
  if (!data.flag == "") {
    whr += ` and  productmaster.flag like '%${data.flag}%'`;
  }
  if (!data.type == "") {
    whr += ` and  productmaster.type = '${data.type}'`;
  }
  if (!data.title == "") {
    whr += ` and  productmaster.title like '%${data.title}%'`;
  }
  if (!data.decr == "") {
    whr += ` and  productmaster.decr like '%${data.decr}%'`;
  }

  if (!data.customwhr == "") {
    whr += ` ${data.customwhr} `;
  }

  if (!data.limit == "") {
    let orderby = "ORDER BY RAND()";
    if (!data.orderby == "") {
      orderby = ` ORDER BY ${data.orderby}`;
    }
    whr += ` ${orderby} limit ${data.limit}`;
  }
  // console.log(whr);

  let data1 = {
    whr: whr,
  };
  let dt = JSON.stringify(data1);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_product(?,?)`;
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

exports.productimgdelete = async (req, res) => {
  const data = req.body;
  // console.log(data.imglink)
  let resdata = imgdelete("./Uploads/Product/"+data.imglink);
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

// exports.productimgupload = async (request, response) => {
//   let stslinkArray = [];
//   var storage = multer.diskStorage({
//     destination: function (request, file, callback) {
//       callback(null, "./Uploads/Product");
//     },
//     filename: function (request, file, callback) {
//       var temp_file_arr = file.originalname.split(".");
//       var temp_file_type = file.mimetype;
//       var temp_file_name = `product_`;

//       var temp_file_extension = temp_file_arr[1];
//       var fname = temp_file_name + "" + Date.now() + "." + temp_file_extension;
//       callback(
//         null,
//         temp_file_name + "" + Date.now() + "." + temp_file_extension
//       );
//       stslink = {
//         id: Date.now(),
//         imglink: IMG_URL + "Uploads/Product/" + fname,
//         media_type: temp_file_type,
//       };
//       stslinkArray.push(stslink);
//     },
//   });
//   var upload = multer({ storage: storage, uid: "2" }).array("file[]");

//   upload(request, response, function (error) {
//     if (error) {
//       let data = {
//         code: 100,
//         msg: "File not upload",
//       };
//       return response.json(data);
//     } else {
//       let data = {
//         code: 200,
//         data: stslinkArray,
//         msg: "File upload done",
//       };
//       return response.json(data);
//     }
//   });
// };