const passport = require('passport');
const google_auth = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/auths');


passport.use(new google_auth({
    clientID: '143297619155-nufokb742b754o1or6s3b1p5c355q0mc.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/google/callback',
    passReqToCallback: true
},
    function (req,accesToke, refreshToken, profile, done) {
        User.findOne({ mail: profile.emails[0].value }).exec(function (err, user) {
            if (err) { console.log(`error at googleauth find one ${err}`); return; }
            console.log(profile);
            if (user) {
                
               
                return done(null, user);
            }
            else {
                User.create({
                    mail: profile.emails[0].value,
                    pwd: crypto.randomBytes(10).toString('hex')
                }, function (err, user) {
                    if (err) {
                        console.log(`error in google auth create user ${err}`);
                        return;
                    }
                    
                  
                    req.session.name = user.mail;
                    return done(null, user);
                })
            }
        })

    }
));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});
module.exports = passport;