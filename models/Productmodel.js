class Productmodel {
    tablename = "ProductMaster";
    data = [
      {
        prodid: "bigint AUTO_INCREMENT,PRIMARY KEY(prodid)",
        title:"varchar(255)",
        decr:"text",
        offer: "text",
        pricedetail: "text",
        imgdata: "text",
        isactive: "tinyint(5)"
        
        
        
       
      },
    ];
  }
  
  module.exports = {
    Productmodel,
  };
  