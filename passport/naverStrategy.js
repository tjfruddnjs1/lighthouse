const passport = require('passport');
const NaverStrategy = require('passport-naver').Strategy;

const User = require('../models/user');

module.exports = ()=> {
    passport.use(new NaverStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/naver/callback',
	}, async (accessToken, refreshToken, profile, done) => {
        console.log('naver profile', profile);
        try{
            const exUser = await User.findOne({
                where : {snsId:profile.id, provider:'naver'},
            });
            if(exUser){
                done(null,exUser);
            }else{
                const newUser = await User.create({
                    email : profile._json.email,
                    username : profile._json.email,
                    snsId:profile.id,
                    provider:'naver',
                });
                done(null, newUser);
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};