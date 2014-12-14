/**
 * Created by 路佳 on 2014/12/13.
 */

exports.check = function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  var session = req.session;
  if (session.user) {
    res.json({code: 0, msg: 'login', me: session.user});
  } else {
    res.status(401).json({code: 1, msg: 'not-login'});
  }
};

exports.login = function (req, res) {
  
};

exports.logout = function (req, res) {
  req.session.user = null;

  res.json({
    code: 0,
    msg: 'logout'
  });
};