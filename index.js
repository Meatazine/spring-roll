/**
 * Created by 路佳 on 2014/12/13.
 */

var express = require('express')
  , session = require('express-session')
  , bodyParser = require('body-parser')
  , user = require('./router/user')
  , app = new express();

app.use(function (req, res, next) {
  res.set('Access-Control-Allow-Origin', 'http://meagazine.com');
  res.set('Access-Control-Allow-Credentials', true);
  next();
});
app.use(session({
  secret: 'muimui'
}));
app.use(bodyParser.json());


app.get('/', function (req, res) {
  res.send('hello, world');
});

// user
app.options('/user/:token', user.options);
app.get('/user/', user.check);
app.put('/user/:token', user.login);

var server = app.listen(3000, function () {
  var host = server.address().address
    , port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});