const db = require("../db/db");
const fs=require("fs");

const IMG_URL = "http://localhost:4000/";
// const IMG_URL = "http://demo.statuslly.com/";

const droptable = (tblname) => {
  let sql = `DROP TABLE if exists ${tblname}`;
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
  });
};
const createdb = () => {
  let sql = "CREATE DATABASE VJweb";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("demo Database created");
  });
};

const execute_query = (sql, sdt, mode) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(sql, [sdt, mode], (err, result) => {
        if (err) {
          let data = {
            code: 500,
            msg: "Something went wrong! please try again",
            err: err,
          };
          resolve(data);
        }
        resolve(result);
      });
    } catch (error) {
      let data = {
        code: 600,
        msg: "Something went wrong! please try again",
        err: error,
      };
      resolve(data);
    }
  });
};

const imgupload = (imgdata, path) => {
  try {
    let imgArr = [];
    imgdata.forEach((element) => {
      let imgexte = element.img.split(";");
      imgexte = imgexte[0].replace("data:image/", "");
      let imgdata = element.img.replace(`data:image/${imgexte};base64,`, "");
      let date_ob = new Date().getTime();
      var newPath = path + `${element.id}${date_ob}.${imgexte}`;
      fs.writeFile("./" + newPath, imgdata, "base64", function (err) {
        if (err) throw err;
        // res.redirect("back");
      });
      imgArr.push({
        id: element.id,
        imglink: newPath,
        type: "image",
      });
    });
    return imgArr;
  } catch (error) {
    return { code: 500, err: error };
  }
};

const imgdelete = (imgpath) => {
  return new Promise((resolve, reject) => {
    try {
      fs.unlink(imgpath, function (err) {
        if (err) {
          resolve(err);
        }
        resolve(true);
        // if no error, file has been deleted successfully
      });
    } catch (error) {
      resolve(false);
    }
  });
};
const mailconfig={
 
  host: "mail.knoxkart.xyz",
  secure: true,
  port: 465,
  auth: { user: "support@knoxkart.xyz", pass: "Matrix@1234$#@!" }
}
const fromemail="support@knoxkart.xyz";
module.exports = { droptable, createdb, execute_query,imgupload,imgdelete,IMG_URL ,mailconfig,fromemail};
