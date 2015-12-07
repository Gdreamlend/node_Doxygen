var path = require('path');

var koa = require('koa');
var mount = require('koa-mount');
var serve = require('koa-static');
var render = require('koa-ejs');
var app = koa();

var router = require('./routes.js');
var session = require('koa-generic-session');

app.keys=['keys'];

app.use(mount('/public',serve(path.join(__dirname,'public'))));

app.use(session());

render(app, {
  root: path.join(__dirname, 'views'),
  layout: false,
  viewExt: '',
  cache: false,
  debug: true
});
app.use(router.routes());

app.listen(8080);




