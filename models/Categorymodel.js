class Categorymodel {
    tablename = "categorymaster";
    data = [
      {
        catgid: "bigint AUTO_INCREMENT,PRIMARY KEY(catgid)",
        catgname:"varchar(50)",
        imgdata:"text",
        isactive:"tinyint(5)",
        
        
       
      },
    ];
  }
  
  module.exports = {
    Categorymodel,
  };
  