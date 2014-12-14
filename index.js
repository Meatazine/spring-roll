/**
 * Created by 路佳 on 2014/12/13.
 */

var express = require('express')
  , session = require('express-session')
  , user = require('./router/user')
  , app = new express();

app.use(session({
  secret: 'muimui good dog'
}));


app.get('/', function (req, res) {
  res.send('hello, world');
});

// user
app.get('/user/', user.check);
app.put('/user/', user.login);

var server = app.listen(3000, function () {
  var host = server.address().address
    , port = server.address().port;
  console.log('listening at http://%s:%s', host, port);
});