const { response } = require("express");
const db = require("../db/db");
const { loginmodel } = require("../models/loginmodel");
const nodemailer = require("nodemailer")

const { execute_query, mailconfig, fromemail } = require("../routes/global");

exports.logintbl = async (req, res) => {
  let sql = `CREATE TABLE ${new loginmodel().tablename}(
      ${Object.entries(new loginmodel().data[0])
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
      msg: `${new loginmodel().tablename} table created successfuly`,
      data: [],
    };
    res.json(data);
  });
};

exports.insertlogindata = async (req, res) => {
  const data = req.body;

  
  // let value = await CryptoJS.AES.encrypt('vj',data.passwd).toString();
  let mystr = Buffer.from(data.passwd).toString("base64")
    // console.log(mystr.encryptedData.toString());
  // mystr = mystr.Replace("Buffer","")
  //  console.log(mystr)
  let data2 = {
    logid: data.logid,
    uname: data.uname,
    mob: data.mob,
    emailid: data.emailid,
    passwd: mystr.toString(),
    isstatus: data.isstatus,
    otp: data.otp,
    role:data.role,
    gender:data.gender
  };
  // let sql = `INSERT INTO ${new StatuslikemasterModel().tablename} SET ?`;
  let dt = JSON.stringify(data2);
  let sdt = dt.replace(/\\/g, "");

  let sql = `CALL sp_login(?,?)`;
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

exports.signin= async (req, res) => {
  const data = req.body;
  let whr = "";
  if (!data.mob == "") {
    whr += ` and  login.mob = '${data.mob}'`;
  }
  if (!data.role == "") {
    whr += ` and  login.role = '${data.role}'`;
  }

  let data2={
    whr:whr
  }
// console.log(whr);
  let dt = JSON.stringify(data2);
  let sdt = dt.replace(/\\/g, "");

  let sql = `CALL sp_login(?,?)`;
  const resdata = await execute_query(sql, sdt, 5);
//  console.log(resdata);
  if (resdata.code == 500) {
    return res.json(resdata);
  } else {
    if (!resdata[0][0]) {
      const data1 = {
        code: 300,
        msg: "Invalid password",
        data: [],
      };
      return res.json(data1);
    }

    // console.log(JSON.stringify(resdata[0][0]));
    // console.log(resdata[0][0].passwd);

    var decrypted = Buffer.from(resdata[0][0].passwd,"base64").toString("ascii")     
         
    //  console.log(decrypted)
    if(decrypted==data.passwd) {
      const data1 = {
        code: 200,
        data: [{
          logid:resdata[0][0].logid,
          mob:resdata[0][0].mob,
          uname:resdata[0][0].uname,
          emailid:resdata[0][0].emailid
        }],
        msg: "sigin successfuly",
      };
      return res.json(data1);
    }
    const data1 = {
      code: 300,
      data: [],
      msg: " Invalid Mobile number or password",
    };
    return res.json(data1);
  }
};


exports.saveloginmaster = async (req, res) => {
  const data = req.body;
  // let imgdata = imgupload(data.imgdata, "Uploads/Banner/");
  let data2 = {
    logid: data.logid,
    uname: data.uname,
    mob: data.mob,
    emailid: data.emailid,
    passwd: data.passwd,
    isstatus: data.isstatus,
    otp: data.otp,
  };
  let dt = JSON.stringify(data);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_login(?,?)`;
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

exports.updateloginmaster = async (req, res) => {
  const data = req.body;
  let dt = JSON.stringify(data);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_login(?,?)`;
  const resdata = await execute_query(sql, sdt, 2);
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

exports.deleteloginmaster = async (req, res) => {
  const data = req.body;
  let dt = JSON.stringify(data);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_login(?,?)`;
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

exports.Getloginmasterdata = async (req, res) => {
  const data = req.body;
  let whr = "";
  if (!data.mob == "") {
    whr += ` and mob = '${data.mob}'`;
  }
  if (!data.logid == "") {
    whr += ` and logid = '${data.logid}'`;
  }
  if (!data.uname == "") {
    whr += ` and uname = '${data.uname}'`;
  }
  if (!data.mob == "") {
    whr += ` and mob = '${data.mob}'`;
  }
  if (!data.emailid == "") {
    whr += ` and emailid = '${data.emailid}'`;
  }
  if (!data.isstatus == "") {
    whr += ` and isstatus = '${data.isstatus}'`;
  }
  if (!data.otp == "") {
    whr += ` and otp = '${data.otp}'`;
  }
  let data1 = {
    whr: whr,
  };
  let dt = JSON.stringify(data1);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_login(?,?)`;
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

exports.sendopt = async (req, res) => {
  const data = req.body;
  let data2 = {
    mob: data.mob,
    otp: data.otp,
  };
  let dt = JSON.stringify(data2);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_login(?,?)`;
  const resdata = await execute_query(sql, sdt, 1);
  if (resdata.code == 500) {
    return res.json(resdata);
  } else {
    const data1 = {
      code: 200,
      msg: "otp send successfully",
    };
    return res.json(data1);
  }
};

exports.verifyopt = async (req, res) => {
  const data = req.body;
  let whr = "";
  if (!data.mob == "") {
    whr += ` and  login.mob = '${data.mob}'`;
  }
  if (!data.otp == "") {
    whr += ` and  login.otp = '${data.otp}'`;
  }
  // console.log(whr);
  let data1 = {
    whr: whr,
  };
  let dt = JSON.stringify(data1);
  let sdt = dt.replace(/\\/g, "");
  let sql = `CALL sp_login(?,?)`;
  const resdata = await execute_query(sql, sdt, 4);
  if (resdata.code == 500) {
    return res.json(resdata);
  } else {
    if (!resdata[0][0]) {
      const data1 = {
        code: 300,
        msg: "Invalid OTP",
        data: [],
      };
      return res.json(data1);
    }
    const data1 = {
      code: 200,
      data: [],
      msg: "Account verified successfuly",
    };
    return res.json(data1);
  }
};
exports.sendotp_email = async (req,res) => {
  const data = req.body;
  //  console.log(data)
  let transporter = nodemailer.createTransport(mailconfig);

   let sdt1 = data.htmlmsg.replace(/\\/g, "");
  //  console.log(sdt);
   let mailoptions = {
     from: fromemail,
     to: data.email,
     subject: "VJewellery:OTP for Login",
     text: "VJewellery:VJewellery:OTP for Login",
     html:`${sdt1}`,
   };
  transporter.sendMail(mailoptions, function (error, info) {
    if (error) {
      // console.log(error);
      const data1 = {
        code: 100,
        msg: "Invalid Email",
      };
      return res.json(data1);
    }  else {
    const data1 = {
      code: 200,
      msg: "OTP send your email successfully",
    };
    return res.json(data1);
  }
})
};

