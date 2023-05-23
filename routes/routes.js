const express = require("express");
const router = express.Router();


const Bannercontroller = require("../controller/Bannercontroller");
const dbcontroller = require("../controller/dbcontroller");
const Categorycontroller = require("../controller/Categorycontroller");
const Subcategorycontroller = require("../controller/Subcategorycontroller");
const Customcontroller = require("../controller/Customcontroller");
const Customercontroller = require("../controller/Customercontroller");
const Smscontroller = require("../controller/Smscontroller");
const Companycontroller = require("../controller/Companycontroller");
const Logincontroller = require("../controller/logincontroller");
const Productcontroller = require("../controller/Productcontroller");
const Enquirycontroller =  require("../controller/Enquirycontroller");
const Imageuploadcontroller = require("../controller/Imageuploadcontroller");
router.get("/createdb", dbcontroller.createdb);

router.get("/createbannertable", Bannercontroller.bannermastertbl);
router.get("/createcategorytable", Categorycontroller.categorymastertbl);
router.get("/creatsubcattbl", Subcategorycontroller.subcategorymastertbl);
router.get("/createcustomtbl", Customcontroller.customsettingtbl);
router.get("/createcomptbl", Companycontroller.companymastertbl);
router.get("/createlogintbl", Logincontroller.logintbl);
router.post("/insertbannerdata", Bannercontroller.insertbannerdata);
router.post("/updatebannerdata", Bannercontroller.updatebannermaster);
router.post("/deletebannerdata", Bannercontroller.deletebannermaster);
router.post("/getbannermasterdata", Bannercontroller.Getbannermasterdata);

router.get("/createenquirytbl", Enquirycontroller.enquirytbl);
router.post("/insertenquirydata",Enquirycontroller.insertenquirydata);
router.post("/updateenquirydata",Enquirycontroller.updateenquirydata);
router.post("/deleteenquirydata",Enquirycontroller.deleteenquirydata);
router.post("/getenquirydata",Enquirycontroller.Getenquirydata);

router.post("/insertcategorydata", Categorycontroller.insertcategorydata);
router.post("/updatecategorydata", Categorycontroller.updatecategorymaster);
router.post("/deletecategorydata", Categorycontroller.deletecategorymaster);
router.post("/getcategorymasterdata", Categorycontroller.Getcategorymasterdata);

router.post( "/insertsubcategorydata",Subcategorycontroller.insertsubcategorydata);
router.post("/updatesubcategorydata",Subcategorycontroller.updatesubcategorymaster);
router.post("/deletesubcategorydata",Subcategorycontroller.deletesubcategorymaster);
router.post("/getsubcategorymasterdata",Subcategorycontroller.Getsubcategorymasterdata);

router.post("/categorydeleteimg", Categorycontroller.categoryimgdelete);
router.post("/subcategorydeleteimg",Subcategorycontroller.subcategoryimgdelete);

router.get("/createcustomertable", Customercontroller.customertbl);
router.post("/insertcustomerdata", Customercontroller.insertcustomerdata);
router.post("/deletecustomerdata", Customercontroller.deletecustomermaster);
router.post("/updatecustomerdata", Customercontroller.updatecustomermaster);
router.post("/getcustomerdata", Customercontroller.GetCustomermasterdata);

router.post("/getcustommasterdata",Customcontroller.Getcustommasterdata);

router.post("/insertsmsmasterdata", Smscontroller.insertsmsmasterdata);
router.post("/deletesmsmasterdata", Smscontroller.deletesmsmaster);
router.post("/getsmsmasterdata", Smscontroller.Getsmsdata);

router.post("/insertlogindata", Logincontroller.insertlogindata);
router.post("/updateLogindata", Logincontroller.updateloginmaster);
router.post("/deleteLogindata", Logincontroller.deleteloginmaster);
router.post("/getlogindata", Logincontroller.Getloginmasterdata);
router.post("/singin",Logincontroller.signin);

router.post("/insertcompanydata", Companycontroller.insertcompanydata);
router.post("/updatecompanydata", Companycontroller.updatecompanymaster);
router.post("/deletecompanydata", Companycontroller.deletecompanymaster);
router.post("/getcompanydata", Companycontroller.GetComapnymasterdata);
router.post("/deletecompanyimage", Companycontroller.companymasterimgdelete);

router.get("/createproducttbl", Productcontroller.producttbl);
router.post("/insertproduct", Productcontroller.insertproductdata);
router.post("/updateproduct", Productcontroller.updateproductmaster);
router.post("/deleteproduct", Productcontroller.deleteproductmaster);
router.post("/getproductdata", Productcontroller.Getproductmasterdata);
// router.post("/productimgupload", Productcontroller.productimgupload);


router.post("/catgimgupload",Categorycontroller.catgimgupload);
router.post("/bannerimgupload",Bannercontroller.bannerimgupload);
router.post("/bannerimgdelete",Bannercontroller.bannerimgdelete);
router.post("/imgupload",Imageuploadcontroller.Imgupload);
router.post("/imgsave",Imageuploadcontroller.Saveimageupload);
router.post("/Createimgupltbl",Imageuploadcontroller.ImageUploadTbl);
router.post("/getimg",Imageuploadcontroller.Getimageupload);
router.post("/sendotp",Logincontroller.sendotp_email);
module.exports = router;
