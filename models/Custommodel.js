class Custommodel {
    tablename = "customsetting";
    data = [
      {
        custid: "bigint AUTO_INCREMENT,PRIMARY KEY(custid)",
        sname:"text",
        svalue:"text",
        sremark:"text",
        
       
      },
    ];
  }
  
  module.exports = {
    Custommodel,
  };
  