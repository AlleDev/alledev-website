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
    title : '首页',

  });
});
//the method get register page
router.get('/register',checkNotLogin);
router.get('/register',function(req,res,next) {
  res.render('index',{
    title : '注册',

  });
});
//the method post register page
router.post('/register',checkNotLogin);
router.post('/register',function(req,res,next) {
  //check if the password and password-repeat are same
  if(req.body['password-repeat']!=req.body['password']){
    req.flash('error','两次输入的密码不一样');
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
  //check if the name already exists
  User.get(newUser.name,function(error,user){
    if(user)
      error="User name already exists."
    if(error){
      req.flash('error',error);
      return res.redirect('/register');
    }
    //if the name does not exist,save it
    newUser.save(function(error){
      if(error){
        req.flash('error',error);
        return res.redirect('/register');
      }
      req.session.user=newUser;
      req.flash('sucess','注册成功');
      res.redirect('/');
    });
  });
});
//the method get login page
router.get('/login',checkNotLogin);
router.get('/login',function(req,res) {
  res.render('login',{
    title:'用户已登入',
  });
});
//the methods get post page
router.post('login',checkNotLogin);
router.post('/login',function(req,res) {
  var md5 = crypto.createHash('md5');
  var password = md5.update(req.body.password).digest('base64');
  User.get(req.body.username, function(err, user) {
    if (!user) {
      req.flash('error', '用戶不存在');
      return res.redirect('/login');
    }
    if (user.password != password) {
      req.flash('error', '用戶口令錯誤');
      return res.redirect('/login');
    }
    req.session.user = user;
    req.flash('success', '登入成功');
    res.redirect('/');
  });
});
//get about page
router.get('/about',function(req,res,next) {

});
//get contract page
router.get('/contract',function(req,res,next) {

});
//get user home
router.get('/user/:user',function(req,res,next) {
  User.get(req.params.user, function(err, user) {
    if (!user) {
      req.flash('error', '用戶不存在');
      return res.redirect('/');
    }
    res.render('user', {
      title: user.name,

    });
  });
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
//this method check user not login
function(req, res, next) checkNotLogin{
  if (req.session.user) {
    req.flash('error', '已登入');
    return res.redirect('/');
  }
  next();
}
//this method check user already exists
function checkLogin(req, res, next) {
  if (!req.session.user) {
    req.flash('error', '未登入');
    return res.redirect('/login');
  }
  next();
}

module.exports = router;
