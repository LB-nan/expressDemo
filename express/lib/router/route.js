const Layer = require('./layer');
const methods = require('methods');

function Route() {
  this.stack = [];
  this.methods = {}; // 存放加载过的方法 用来做判断是否有这个方法
}

Route.prototype.dispatch = function(req, res, out) {
  let idx = 0;
  let next = () => {
    // 如果遍历完全栈都没有找到的话就去找下一层
    if (idx >= this.stack.length) {
      return out();
    }
    let layer = this.stack[idx++];
    // 如果匹配到路由
    if (layer.method == req.method.toLowerCase()) {
      layer.handler_request(req, res, next);
    } else {
      next();
    }
  }
  next();
}

// index里面只存放路径和layer，layer上的route存放事件
methods.forEach(method => {
  Route.prototype[method] = function(handlers) {
    /*
      用户可能会存多个handle，需要存放到一个栈里面

      用户使用情况：
      app.get('/', function(req, res,next){}, function(req,res,next){})
    */
    handlers.forEach(handler => {
      // 子route里面的路径没意义，随意填，因为外层的router已经存了
      let layer = new Layer('/', handler);
      layer.method = method;
      this.methods[method] = true;
      this.stack.push(layer);
    })
  }
})

module.exports = Route;