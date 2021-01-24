const Sequelize = require("sequelize");
const User = require('./user');
const Mentor= require('./mentor');

const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.sequelize = sequelize;

db.User = User;
db.Mentor = Mentor;


User.init(sequelize);
Mentor.init(sequelize);

User.associate(db);
Mentor.associate(db);

module.exports = db;