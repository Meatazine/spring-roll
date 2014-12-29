/**
 * Created by 路佳 on 2014/12/13.
 */

var request = require('request')
  , _ = require('underscore');

exports.check = function (req, res) {
  var session = req.session;
  if (session.user) {
    res.json({code: 0, msg: 'login', me: session.user});
  } else {
    res.status(401).json({code: 1, msg: 'not-login'});
  }
};

exports.login = function (req, res) {
  // TODO 处理数据库插入之类的动作
  var session = req.session;

  // 读取用户信息
  var url = 'https://graph.qq.com/user/get_user_info?access_token=' + req.body.token + '&oauth_consumer_key=' + req.body.client_id + '&openid=' + req.body.openid;
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var json = JSON.parse(body);
      session.user = _.extend(json, req.body);
      res.json({
        code: 0,
        msg: 'login',
        data: json
      });
    } else {
      console.log('get qq data error: ', error);
    }
  });
};

exports.logout = function (req, res) {
  req.session.user = null;

  res.json({
    code: 0,
    msg: 'logout'
  });
};

exports.options = function (req, res) {
  res.set('Access-Control-Allow-Headers', 'accept, content-type');
  res.set('Access-Control-Allow-Methods', 'PUT,PATCH,DELETE');
  res.json({
    code: 0,
    msg: 'ready'
  });
};