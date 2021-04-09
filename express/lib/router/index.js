const url = require('url');
const Layer = require('./layer');
const Route = require('./route');
const methods = require('methods');

function Router() {
  this.stack = [];
}

Router.prototype.route = function(path) {
  /*
    创建个route、layer  layer是用来做收集的
    把route和layer关联，在layer上面加上route 的dispatch方法
    把layer存到当前的stack里面
    返回一个route
  */
  let route = new Route();
  let layer = new Layer(path, route.dispatch.bind(route));
  layer.route = route;
  this.stack.push(layer);
  return route;
}

methods.forEach(method => {

  Router.prototype[method] = function(path, handlers) {
    /*
      1. 调用get时，需要保存成一个layer存放到栈里面
      2. 产品一个Route实例和当前的layer关联
      3. 将route的dispatch方法存到layer上  

      route是一条路由
      router是整个路由系统
      layer是一个容器，栈结构
      router里面会包含多个route，每个route存放在layer上，layer包含path 和 route.dispatch()
      route里面会有多个handle, 每个都存放在layer上，包含每个handle
    */
    let route = this.route(path);
    route[method](handlers);
  }
})


Router.prototype.handle = function(req, res, done) {
  let { pathname } = url.parse(req.url);
  let idx = 0;
  let next = () => {
    // 如果遍历完全栈都没有找到的话就404
    if (idx >= this.stack.length) {
      return done();
    }

    let layer = this.stack[idx++];

    // 如果匹配到路由
    if (layer.match(pathname)) {
      // 如果匹配到了，就让layer上的handler执行, handler就是上面的route.dispatch  ---- new Layer(path, route.dispatch.bind(route));
      // 将调用路由系统中下一层的控制权限交给route.dispatch
      layer.handler_request(req, res, next);
    } else {
      // 当前没有匹配到就继续下一个匹配
      next();
    }
  }
  next();
}

module.exports = Router;