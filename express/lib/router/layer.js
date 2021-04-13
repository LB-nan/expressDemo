function Layer(path, handler) {
  this.path = path;
  this.handler = handler;
}
Layer.prototype.match = function(path) {
  if (this.path === path) {
    return true;
  }
  
  // 匹配中间件的
  if (!this.route) {
    if (this.path === '/') {
      return true;
    }
    return path.startsWith(this.path + '/');
  }

  return false;
}

Layer.prototype.handler_request = function(req, res, next) {
  this.handler(req, res, next);
}

module.exports = Layer;