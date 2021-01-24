const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      username : {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      email : {
        type : Sequelize.STRING(50),
        allowNull: true,
        unique: true,
      }, 
      password : {
        type: Sequelize.STRING(200),
        allowNull : true,
      },
      provider : {
        type : Sequelize.STRING(10),
        allowNull : false,
        defaultValue : 'local',
      },
      snsId:{
          type : Sequelize.STRING(30),
          allowNull : true,
      } 
    }, {
      sequelize,
      timestamps: false,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
  }
};