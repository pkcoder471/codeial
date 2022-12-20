const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new googleStrategy({
    clientID:"85653991578-mvs3jjhudok8mko6vpub4agc08ur65kn.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/users/auth/google/callback"
},
function(accessToken,refreshToken,profile,done){
    User.findOne({email: profile.emails[0].value}).exec(function(err,user){
        if(err){ console.log("error in creating google strategy",err)};
        console.log(profile);
        console.log(accessToken,refreshToken);
        if(user){
            return done(null,user);
        }else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            },function(err,user){
                if(err){console.log("error****",err); return;};
                return done(null,user);
            });
        }
    })

}));

module.exports = passport;