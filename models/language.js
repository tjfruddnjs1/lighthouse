const Sequelize = require('sequelize');

module.exports = class Language extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      language : {
          type : Sequelize.STRING(20),
          alloNull : false,               
      },     
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Language',
      tableName: 'languages',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Language.hasMany(db.MentorField, {
      foreignKey : 'language_id', 
      sourceKey : 'id',                        
    });
  }
};