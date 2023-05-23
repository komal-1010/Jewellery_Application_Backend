class enquirymodel {
    tablename = "Enquiry";
    data = [
      {
        
        enqid: "bigint AUTO_INCREMENT,PRIMARY KEY(enqid)",
        logid: "bigint",
        
        edate:"date",
        pdetail: "text",
        descr:"text",
      
      },
    ];
  }
  
  module.exports = {
    enquirymodel,
  };
  