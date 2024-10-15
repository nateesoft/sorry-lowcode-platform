var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var masterRouter = require('./routes/master');

var exportAppsApiRouter = require('./routes/exportApps/service/index');
var exportAppsUiRouter = require('./routes/exportApps/ui/index');
var app01Router = require('./routes/app01');
var app02Router = require('./routes/app02');
var fronendAppRouter = require('./routes/frontend-app');
var graphqlRouter = require('./routes/graphql');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/api/master', masterRouter);

app.use('/api/memberWS', exportAppsApiRouter);
app.use('/api/memberUI', exportAppsUiRouter);
app.use('/api/app01/v1/api', app01Router);
app.use('/api/app02/:serviceId', app02Router);
app.use('/api/frontend', fronendAppRouter);
app.use('/api/graphql', graphqlRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
