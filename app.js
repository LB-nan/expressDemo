const Vue = require('vue');
module.exports = function createApp(context) {
  return new Vue({
    data() {
      return {
        name: '测试，服务端vm.data的数据'
      }
    },
    template: '<div>{{name}}</div>'
  })
}