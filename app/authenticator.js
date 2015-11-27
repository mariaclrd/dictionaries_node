var url = require('url');

module.exports = function(opts){
  var request = opts.request;

  var authUrl = opts.url;
  var env = getEnv(authUrl);
  var cookieKey = opts.cookieKey || (env + '_session_id');
  var userClient = opts.userClient;

  function authentication(req, res, next) {
    var cookies = appendCookie(
      req.headers.cookie, [cookieKey, req.query.sessionid]
    );

    var promise = userClient.findByCookie(cookies);
    promise.then(function(user) { 
      req.body.currentUser = user.uuid; 
      next();
    }, function(error) {
      res.status(401);
      res.json({error: { message: 'Auth error' }});
      res.end();    
    });
  };

  function getEnv(authUrl) {
    return url.parse(authUrl).host.split('.')[0];
  };

  function appendCookie(cookies, elm){
    return [cookies, elm.join('='), ''].join('; ');
  };

  return authentication;
};
