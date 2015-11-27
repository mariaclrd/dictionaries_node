var userClient = function(opts) {
  return {
    findByCookie: function(session) {
      var request = opts.request;
      var authUrl = opts.config.url + '/current_user.json'
      var requestOpts = { url: authUrl, headers: { 'Cookie': session } };

      var promise = new Promise(function(fulfill, reject) {
        request(requestOpts, function (error, response, body) {

          if( error == null && response.statusCode === 200) {
            console.log('USERCLIENT - fulfill');
            fulfill(response.body);
          } else {
            console.log('USERCLIENT - reject');
            console.log('ERROR : ' + error)
;            reject(error);
          }
        });
      });
      return promise;
    }
  }
};

module.exports = userClient;
