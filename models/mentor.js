const Sequelize = require('sequelize');

module.exports = class Mentor extends Sequelize.Model {
  static init(sequelize) {
    return super.init({   
      mentor_id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
      },
      mentor_firm : {
        type: Sequelize.STRING(10),
        allowNull : false,
      },
      mentor_department : {
        type : Sequelize.STRING(10),
        allowNull : false,        
      },
      mentor_career:{
          type : Sequelize.TEXT,
          allowNull : false,
      },                         
      mentor_intro : {
        type : Sequelize.TEXT,
        allowNull : false,        
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
      foreignKey : {name : 'user_id', allowNull : false}, 
      sourceKey : 'id',
      onDelete : 'cascade',           
    });    
    db.Mentor.hasMany(db.MentorJob, {
      foreignKey : {
        name : 'mentor_id',
        allowNull : false,
        primaryKey : true,
      },  
      sourceKey : 'mentor_id',
      onDelete : 'cascade',           
    });
    db.Mentor.hasMany(db.MentorLang, {
      foreignKey : {
        name : 'mentor_id',
        allowNull : false,
        primaryKey : true,
      }, 
      sourceKey : 'mentor_id',
      onDelete : 'cascade',           
    });
    db.Mentor.belongsToMany(db.User, {
      foreignKey : 'mentor_id',      
      through : 'follow',
      timestamps : false
    });
  }
};