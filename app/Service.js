function Service(opts) {
    this.config = opts.config();
    this.expressApp = opts.expressApp();
    this.logger = opts.logger();
}

Service.prototype.start = function () {
    this.port = this.config.port;
    var that = this;
    var print_port = function () {
        console.log('App listening on port ' + that.port);
    };
    this.expressApp.listen(that.port, print_port);
};

module.exports = Service;
