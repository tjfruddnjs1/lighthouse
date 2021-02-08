const Sequelize = require('sequelize');

module.exports = class Mentor extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      username : {
        type: Sequelize.STRING(20),
        allowNull: false,           
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
              
      email : {
        type: Sequelize.STRING(20),
        allowNull : true,
      }, 
      intro : {
        type : Sequelize.TEXT,
        allowNull : false,        
      },  
      path : {
        type : Sequelize.STRING(100),
        allowNull: true,            
      },  
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Mentor',
      tableName: 'mentors',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Mentor.belongsTo(db.User, {
      foreignKey : 'user_id', 
      sourceKey : 'username',
      onDelete : 'cascade',     
    });    
    db.Mentor.hasMany(db.MentorJob, {
      foreignKey : 'mentor_id', 
      sourceKey : 'id',
      onDelete : 'cascade',           
    });
    db.Mentor.hasMany(db.MentorLang, {
      foreignKey : 'mentor_id', 
      sourceKey : 'id',
      onDelete : 'cascade',           
    });
  }
};