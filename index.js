const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const dotenv = require('dotenv');

const { sequelize } = require('./models');
const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');
const mypageRouter = require('./routes/mypage');
const mentorRouter = require('./routes/mentor');
const mentorListRouter = require('./routes/mentorList')
const careerRouter = require('./routes/career');

const passportConfig = require('./passport');


const app = express();
dotenv.config();
passportConfig();

app.set('port', process.env.PORT || 8000);
app.set('view engine', 'ejs');

sequelize.sync({ force: false})
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(methodOverride('_method'));

app.use('/',homeRouter);
app.use('/auth', authRouter);
app.use('/register', mentorRouter);
app.use('/mentorlist', mentorListRouter);

app.use('/career', careerRouter);
app.use('/mypage',mypageRouter);

//ejs 파일에서 바로 사용가능, isAuthenticated는 user가 로그인되어 있는지
//currentUser는 로그인된 user의 정보를 불러오는데 사용

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});
  
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  console.log(err.status +' error 발생')
})

app.listen(app.get('port'), ()=> {
  console.log(app.get('port'), '번 포트에서 대기중');
});
