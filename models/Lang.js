const Sequelize = require('sequelize');

module.exports = class Lang extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      lang_id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
      },
      lang_name : {
          type : Sequelize.STRING(20),
          alloNull : false,               
      },     
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Lang',
      tableName: 'langs',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Lang.hasMany(db.MentorLang, {
      foreignKey : {
        name : 'lang_id',
        allowNull : false,
        primaryKey : true,
      }, 
      sourceKey : 'lang_id',                        
    });
  }
};