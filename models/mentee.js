const Sequelize = require('sequelize');

module.exports = class Mentee extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      school : {
        type: Sequelize.STRING(40),
        allowNull: true,
      },
      major : {
        type : Sequelize.STRING(50),
        allowNull: true,
      },
      isSchool : {
        type : Sequelize.STRING(10),
        allowNull: true,
      },
      schoolYear : {
          type : Sequelize.STRING(10),
          allowNull : true,
      },
      spec : {
        type : Sequelize.STRING(10),
        allowNull : true,
      },
      jobYear : {
        type : Sequelize.STRING(10),
        allowNull : true,
      },
      graduate : {
        type : Sequelize.STRING(50),
        allowNull : true,
      },
      graduateSchool : {
        type : Sequelize.STRING(50),
        allowNull : true,
      },
      career : {
        type : Sequelize.STRING(500),
        allowNull : true,
      },
      etc : {
        type : Sequelize.STRING(500),
        allowNull : true,
      },
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Mentee',
      tableName: 'mentees',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.Mentee.belongsTo(db.User, {
        foreignKey : 'user_email', 
        targetKey : 'email',
        onDelete : 'cascade',     
      });
  }
};