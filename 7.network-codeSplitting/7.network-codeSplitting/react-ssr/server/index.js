// server/index.js 
const Koa = require('koa');
const serve = require('koa-static');
const path = require('path');

const app = new Koa();

const render = require('./render')

app.use((ctx, next) => {
  if(ctx.path === '/') return render(ctx);
  return next();
})

app.use(serve(path.resolve(__dirname, '../build/')));
app.use(render);

app.listen(3003);