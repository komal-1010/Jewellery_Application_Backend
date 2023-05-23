class loginmodel {
    tablename = "login";
    data = [
      {
        logid: "bigint AUTO_INCREMENT,PRIMARY KEY(logid)",
        uname:"varchar(100)",
        mob:"varchar(12)",
        emailid:"varchar(100)",
        passwd: "varchar(255)",
        isstatus:"tinyint(5)",
        otp:"varchar(10)",
        role:"varchar(20)",
        gender:"varchar(20)"
      },
    ];
  }
  
  module.exports = {
    loginmodel,
  };
  