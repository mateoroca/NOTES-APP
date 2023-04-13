const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


passport.use(new LocalStrategy({
  usernameField:'email',
  
}, async (email,password,done)=>{
    const user = await User.findOne({email:email});
    if(!user){
      return done(null,false,{message:'Not user Found.'})
    }
    else{
      const isMatch = await user.matchPassword(password);
      if(!isMatch){
        return done(null,false,{message:'Incorrect Password'})
        
      }
      else{
        return done(null,user);
      }
    }
}));

passport.serializeUser((user,done)=>{
  done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

