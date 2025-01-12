const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser')
const basicAuth = require('express-basic-auth')

const indexRouter = require('./routes/index');
const masterRouter = require('./routes/master');

const exportAppsApiRouter = require('./routes/exportApps/service/index');
const exportAppsUiRouter = require('./routes/exportApps/ui/index');
const app01Router = require('./routes/app01');
const app02Router = require('./routes/app02');
const fronendAppRouter = require('./routes/frontend-app');
const graphqlRouter = require('./routes/graphql');

const app = express();

// auth api
const username = process.env.WEB_USER_AUTH
const password = process.env.WEB_USER_PASS
app.use(basicAuth({ users: { [username]: password }}))
app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded( { extended: true, limit: '50mb' }))

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

process.on('uncaughtException', err => {
  console.error(err.stack)
})

module.exports = app;
