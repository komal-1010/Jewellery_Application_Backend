class Customermodel {
    tablename = "customermaster";
    data = [
      {
        custid: "bigint AUTO_INCREMENT,PRIMARY KEY(custid)",
        custname:"varchar(100)",
        mob:"varchar(12)",
        wmob:"varchar(12)",
        gender:"varchar(150)",
        dob:"date",
        address:"text",
    },
    ];
  }
  
  module.exports = {
    Customermodel,
  };
  