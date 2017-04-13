var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;
var User = require('../models/UserModel');
var jwt = require('jsonwebtoken');
//passport configuration here
// clientID: '170854036767759',
// clientSecret: '139d441b204ea835e8ce50b5b460a1c7'
passport.use(new FacebookStrategy({
    clientID: '170854036767759',
    clientSecret: '139d441b204ea835e8ce50b5b460a1c7',
    callbackURL: 'http://localhost:8000/auth/facebook/callback',
    profileFields: ['email', 'displayName']
  },
  function(accessToken, refreshToken, profile, done) {

    //code to check database goes here
    User.findOne({'socialId': profile.id}, function(err,user){
      if(err){
        return done(err);
      }
      if(!user){
        user = new User({
          socialId: profile.id,
          name: profile.displayName,
          email: profile.emails ? profile.emails[0].value : "",
          provider: 'facebook',
          loginCount: 0
        })
      } else {
        user.loginCount++;
      }
      user.save(function(err,newUser){
        if(err){
          return done(err);
        } else {
          var token = jwt.sign({id: newUser.id, name: newUser.name}, 'thisIsTopSecret', { expiresIn: "7d" });
          return done(null,{token:token,name:newUser.name});
        }
      })
    })

    // //code to create JWT goes here
    // var token = jwt.sign({id: newUser.id, name: newUser.name
    // }, 'thisIsTopSecret', { expiresIn: "7d" });
    // console.log(token);
  }
));
module.exports = passport;
