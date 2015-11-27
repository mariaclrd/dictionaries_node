var userClient = function(opts) {
  return {
    findByCookie: function(session) {
      var request = opts.request;
      var authUrl = opts.config.url + '/current_user.json'
      var requestOpts = { url: authUrl, headers: { 'Cookie': session } };

      var promise = new Promise(function(fulfill, reject) {
        request(requestOpts, function (error, response, body) {
          if( error == null && response.statusCode === 200) {
            console.log('-------- RESPONSE.BODY ' + response.body);
            fulfill(JSON.parse(response.body));
          } else {
            reject(error);
          }
        });
      });
      return promise;
    }
  }
};

module.exports = userClient;
