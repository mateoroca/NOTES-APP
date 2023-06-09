const express = require('express');
const user = require('../models/user');

const passport = require('passport');

const router = express.Router();


router.get('/users/signin', (req,res)=>{
  res.render('users/signin');
});



router.post('/users/signin',passport.authenticate('local',{
  successRedirect: '/notes',
  failureRedirect: '/users/signin',
  failureFlash: true,
}));

router.get('/users/signup', (req,res)=>{
  res.render('users/signup');
});

router.post('/users/signup',async (req,res)=>{
    const  {name ,email ,password , confirm_password} = req.body;
      
    const errors = [];

    if(name.length <= 0 || email.length <= 0 || password.length <= 0 || password.length <= 0){
        errors.push({text:'Please fill in the blanks '});
    }
    if(password != confirm_password){
      errors.push({text:'Password do not match'});
    }
    if(password.length < 8 || confirm_password < 8){
        errors.push({text:'Password must be least 4 characters'})
    }
    if(errors.length > 0 ){
      res.render('users/signup', {errors,name,email,password,confirm_password});

    } else{
           const emailUser = await user.findOne({email: email});

          if(emailUser){
            errors.push({text:'the email is already in use'});
            res.render('users/signup',{errors});
          } else {
              const newUser = new user({name,email,password});
              newUser.password = await newUser.encryptPassword(password);
              await newUser.save();
              req.flash('success_msg','You are registered');
              res.redirect('/users/signin');
          }
        }
});

router.get('/users/logout',(req,res)=>{
  
  req.logOut(function(err) {
    if(err) {
      console.log(err);
    }
    res.redirect('/');
  });
});

module.exports = router;