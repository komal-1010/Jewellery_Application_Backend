class Companymodel {
    tablename = "companymaster";
    data = [
      {
        cmpid: "bigint AUTO_INCREMENT,PRIMARY KEY(cmpid)",
        cmpname:"varchar(100)",
        ownername:"varchar(255)",
        cmpaddress:"text",
        mob:"varchar(12)",
        wmob:"varchar(12)",
        weblink:"varchar(150)",
        cemail:"varchar(100)",
        officeno:"varchar(20)",
        devoheding:"varchar(20)",
        cmplogo:"text",
        
       
      },
    ];
  }
  
  module.exports = {
    Companymodel,
  };
  