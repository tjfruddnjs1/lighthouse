const Sequelize = require("sequelize");
const User = require('./user');

const Mentor= require('./mentor');
const Drop = require('./drop');
const Mentee = require('./mentee');
const Lang = require('./lang');
const Job = require('./job');
const MentorJob = require('./mentorJob');
const MentorLang = require('./mentorLang');

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
db.Drop = Drop;
db.Mentor = Mentor;
db.Mentee = Mentee;
db.Lang = Lang;
db.Job = Job;
db.MentorJob = MentorJob;
db.MentorLang = MentorLang;

User.init(sequelize);
Drop.init(sequelize);
Mentor.init(sequelize);
Mentee.init(sequelize);
Lang.init(sequelize);
Job.init(sequelize);
MentorJob.init(sequelize);
MentorLang.init(sequelize);


User.associate(db);
Drop.associate(db);
Mentor.associate(db);
Mentee.associate(db);

Mentee.associate(db);
Lang.associate(db);
Job.associate(db);
MentorJob.associate(db);
MentorLang.associate(db);

module.exports = db;