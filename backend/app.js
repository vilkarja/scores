require('dotenv').config()
const Koa = require('koa');
const Knex = require('knex')
const knexConfig = require('./knexfile')

const knex = Knex(knexConfig.development);

const app = new Koa();
const port = process.env.PORT || 3000;

app.use(async ctx => {
  ctx.body = 'Hello';
});

app.listen(port, () => {
    console.log("App listening at port " + port);
});