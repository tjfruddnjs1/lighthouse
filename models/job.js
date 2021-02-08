const Sequelize = require('sequelize');

module.exports = class Job extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      job : {
          type : Sequelize.STRING(20),
          alloNull : false,               
      },     
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Job',
      tableName: 'jobs',
      paranoid: false,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Job.hasMany(db.MentorJob, {
      foreignKey : 'job_id', 
      sourceKey : 'id',                        
    });
    
  }
};