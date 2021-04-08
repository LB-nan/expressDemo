const url = require('url');
const Layer = require('./layer');
const Route = require('./route');

function Router() {
  this.stack = [];
}

Router.prototype.route = function(path) {
  let route = new Route();
  let layer = new Layer(path, route.dispatch.bind(route));
  layer.route = route;
  this.stack.push(layer);
  return route;
}

Router.prototype.get = function(path, handler) {
  /*
    1. 调用get时，需要保存成一个layer存放到栈里面
    2. 产品一个Route实例和当前的layer关联
    3. 将route的dispatch方法存到layer上  
  */
  let route = this.route(path);
  route.get(handlers);
}

Router.prototype.handle = function(req, res, done) {
  let { pathname } = url.parse(req.url);
  let requestMethod = req.method.toLowerCase();
  for (let i = 0; i < this.stack.length; i++) {
    let { path, method, handler } = this.stack[i];
    if (path == pathname && method == requestMethod) {
      return handler(req, res);
    }
  }
  done();
}

module.exports = Router;