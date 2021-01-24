const Sequelize = require('sequelize');

module.exports = class Mentor extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      username : {
        type: Sequelize.STRING(20),
        allowNull: false, 
        primaryKey : true,       
      },
      gender : {
        type : Sequelize.STRING(50),
        allowNull: false,        
      }, 
      firm : {
        type: Sequelize.STRING(10),
        allowNull : false,
      },
      department : {
        type : Sequelize.STRING(10),
        allowNull : false,        
      },
      career:{
          type : Sequelize.TEXT,
          allowNull : false,
      },      
      field : {
        type : Sequelize.STRING(50),
        allowNull: false,        
      }, 
      email : {
        type: Sequelize.STRING(10),
        allowNull : true,
      },         
      email : {
        type: Sequelize.STRING(20),
        allowNull : true,
      }, 
      intro : {
        type : Sequelize.TEXT,
        allowNull : false,        
      },  
      path : {
        type : Sequelize.STRING(50),
        allowNull: true,            
      },  
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Mentor',
      tableName: 'mentors',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
  }
};