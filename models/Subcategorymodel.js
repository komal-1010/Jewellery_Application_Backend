class Subcategorymodel {
    tablename = "subcategorymaster";
    data = [
      {
        subcatgid: "bigint AUTO_INCREMENT,PRIMARY KEY(subcatgid)",
        catgid:"bigint",
        subcatgname:"varchar(50)",
        imgdata:"text",
        isactive:"tinyint(5)",
        
        
        
        
       
      },
    ];
  }
  
  module.exports = {
    Subcategorymodel,
  };
  