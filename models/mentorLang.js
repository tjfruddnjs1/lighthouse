const Sequelize = require('sequelize');

module.exports = class MentorLang extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        
    }, {
      sequelize,
      defaultPrimaryKey: false,
      timestamps: false,
      underscored: false,
      modelName: 'MentoLang',
      tableName: 'mentor_langs',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.MentorLang.belongsTo(db.Mentor, {
      foreignKey : 'mentor_id',
      targetKey : 'mentor_id',          
    }); 
    db.MentorLang.belongsTo(db.Lang, {
      foreignKey : 'lang_id', 
      targetKey : 'lang_id',          
    });        
  }
};