class ImageuploadMaster {
    tablename = "imageuploadmaster";
    data = [
      {
        imgid: "BIGINT AUTO_INCREMENT,PRIMARY KEY(imgid)",
        imgpath: "Text",
        imgtype: "VARCHAR(50)",
        imgname: "VARCHAR(250)",
        uid: "BIGINT",
      },
    ];
  }
  module.exports = {
    ImageuploadMaster,
  };
  