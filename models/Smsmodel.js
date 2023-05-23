class Smsmodel {
    tablename = "SMSMaster";
    data = [
      {
        smsid: "bigint AUTO_INCREMENT,PRIMARY KEY(smsid)",
        sms:"text",
        smstype:"varchar(10)",
    },
    ];
  }
  
  module.exports = {
    Smsmodel,
  };
  