const http = require('http');
const Router = require('./router');
const methods = require('methods');

function Application() {

}

// 路由懒加载，当调用方法的时候再加载路由。
Application.prototype.lazy_route = function() {
  if (!this._router) {
    this._router = new Router();
  }
}

methods.forEach(method => {

  Application.prototype[method] = function(path, ...handler) {
    this.lazy_route();
    this._router[method](path, handler);
  }
})

Application.prototype.use = function() {
  this.lazy_route();
  this._router.use(...arguments);
}

Application.prototype.listen = function(port) {
  const server = http.createServer((req, res) => {
    this.lazy_route();

    function done() {
      res.end(`Cannot ${req.method} ${req.url}`);
    }
    this._router.handle(req, res, done);
  })
  server.listen(...arguments);
}

module.exports = Application;