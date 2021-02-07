const Sequelize = require('sequelize');

module.exports = class Drop extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      email:{
        type : Sequelize.STRING(50),
        alloNull : false,
      },
      reason : {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      etc : {
        type : Sequelize.STRING(2000),
        allowNull: false,
      }, 
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'Drop',
      tableName: 'drops',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
  }
};