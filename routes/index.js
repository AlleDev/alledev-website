//module dependencies
var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var User = require('../models/user.js');
var Project = require('../models/project.js');
var Profile = require('../models/profile.js');

/**
*controller
*/
//the method get home page
router.get('/', function(req, res, next) {
  res.render('index',{
    title : 'HomePage',

  });
});
//the method get register page
router.get('/register',function(req,res,next) {
  res.render('index',{
    title : 'register',

  });
});
//the method post register page
router.post('/register',function(req,res,next) {
  //check if the password and password-repeat are same
  if(req.body['password-repeat']!=req.body['password']){
    req.flash('error','The two passwords differ');
    return res.redirect('/register');
  }
  //get password's md5 value
  var md5 = crypto.createHash('md5');
  var password=md5.update(req.body.password).digest('base64');
  //create a user object
  var newUser = new User({
    name: req.body.username,
    password: password,
  });
  //check if the name has already exist
   
});
//the method get login page
router.get('/login',function(req,res,next) {

});
//post login page
router.post('/login',function(req,res,next) {

});
//get about page
router.get('/about',function(req,res,next) {

});
//get contract page
router.get('/contract',function(req,res,next) {

});
//get user home
router.get('/user/:user',function(req,res,next) {

});
//get project page
router.get('/project/:project',function(req,res,next) {

});
//get create project page
router.get('/createproject',function(req,res,next) {

});
//post create project page
router.post('/createproject',function(req,res,next) {

});
//get profile page
router.get('/profile/:user',function(req,res,next) {

});




















module.exports = router;
