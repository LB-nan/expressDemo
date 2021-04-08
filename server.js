const VueServerRenderer = require('vue-server-renderer');
const Koa = require('koa');
const Router = require('@koa/router');
const fs = require('fs');
const template = fs.readFileSync('./temp.html', 'utf8');
let app = new Koa();
let router = new Router();
const createApp = require('./app')
let render = VueServerRenderer.createRenderer({
  template: template
});
let vm = createApp();


app.use(router.routes());

router.get('/', async(ctx) => {
  ctx.body = await render.renderToString(vm)
})

app.listen(3000)