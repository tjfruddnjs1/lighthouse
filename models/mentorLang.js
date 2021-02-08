const Sequelize = require('sequelize');

module.exports = class MentorLang extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'MentoLang',
      tableName: 'mentorlangs',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.MentorLang.belongsTo(db.Mentor, {
      foreignKey : 'mentor_id', 
      targetKey : 'id',          
    }); 
    db.MentorLang.belongsTo(db.Lang, {
      foreignKey : 'lang_id', 
      targetKey : 'id',          
    });        
  }
};