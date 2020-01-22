require('dotenv').config()
const Koa = require('koa')
const KoaRouter = require('koa-router')
const bodyParser = require('koa-bodyparser')
const Knex = require('knex')
const { Model } = require('objection')

const knexConfig = require('./knexfile')
const apiRoutes = require('./apiRoutes')

const port = process.env.PORT || 3000;

const knex = Knex(knexConfig.development);
Model.knex(knex);

const router = new KoaRouter();
const app = new Koa();

apiRoutes(router);

app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, () => {
  console.log('Example app listening at port ' + port);
});
