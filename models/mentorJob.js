const Sequelize = require('sequelize');

module.exports = class MentorJob extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
        
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'MentoJob',
      tableName: 'mentorjobs',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.MentorJob.belongsTo(db.Mentor, {
      foreignKey : 'mentor_id', 
      targetKey : 'id',          
    });    
    db.MentorJob.belongsTo(db.Job, {
      foreignKey : 'job_id', 
      targetKey : 'id',          
    });      
  }
};