const passport = require('passport');
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
    secretOrKey : 'codeial'
}

passport.use(new JWTstrategy(opts, function(jwtPayload,done){

    User.findById(jwtpayload._id,function(err,user){
        if(err){console.log('Error in finding user from JWT'); return ;}

        if(user){
            return done(null,user);
        }else{
            return done(null,false);
        }
    });
}));

module.exports = passport;