class Bannermodel {
    tablename = "bannermaster";
    data = [
      {
        bid: "bigint AUTO_INCREMENT,PRIMARY KEY(bid)",
        
        btype: "varchar(10)",
        remark: "varchar(500)",
        imgdata:"text",
        
        
       
      },
    ];
  }
  
  module.exports = {
    Bannermodel,
  };
  