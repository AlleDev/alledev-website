var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var tests = require('./routes/test');
//var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/test', tests);
//app.use('/users', users);

//define pages router
app.get('/',routes.home);//homepage
app.get('/register',routes.getRegister);//get register
app.post('/register',routes.postRegister);//post register
app.get('/login',routes.getLogin);//get login
app.post('/login',routes.postLogin);//post login
app.get('/about',routes.about);//about
app.get('/contract',routes.contract);//contract
app.get('/userhome/:user',routes.userHome);//user home
app.get('/project/:project',routes.project);//project
app.get('/newproject',routes.getNewProject);//get new project
app.post('/newproject',routes.postNewProject);//post new project
app.get('/profile/:user',routes.privateProfile);//user profile

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
