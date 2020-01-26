const Score = require('./models/Score');
const User = require('./models/User');

const passwordUtil = require('./utils/password');
const jwt = require('./utils/jwt');
const authenticated = require('./middleware/authenticated');

const BASE_URL = '/api/scores'

module.exports = router => {


  router.post('/api/auth/login', async ctx => {

    const {
      username,
      password
    } = ctx.request.body;
    if (!username) ctx.throw(400, 'Username required')
    if(!password) ctx.throw(400, 'Password required')

    const user = await User.query().where("username", username).first();

    if (!user) {
      ctx.throw(400, 'User not found')
    }

    const pwdMatch = await passwordUtil.comparePassword(password, user.password);

    if (pwdMatch) {
      const token = await jwt.issueToken(user.id);
      ctx.body = {
        token: token,
        user: user
      }
    } else {
      ctx.throw(400, 'Password or username doesn\'t match')
    }

  });

  router.post(BASE_URL, authenticated, async ctx => {

    const insertedScore = await Score.query()
      .insert(ctx.request.body);

    ctx.body = insertedScore
  })




  router.get(BASE_URL, authenticated, async ctx => {
    const query = Score.query();

    if (ctx.query.orderBy) {
      query.orderBy('points', ctx.query.orderBy);
    }

    ctx.body = await query
  })

  router.patch(`${BASE_URL}/:id`, authenticated, async ctx => {
    const numUpdated = await Score.query()
      .findById(ctx.params.id)
      .patch(ctx.request.body)

    ctx.body = {
      success: numUpdated == 1
    }
  })

  router.delete(`${BASE_URL}/:id`, authenticated, async ctx => {
    const numDeleted = await Score.query()
      .findById(ctx.params.id)
      .delete()

    ctx.body = {
      success: numDeleted == 1
    }
  })

  router.delete(BASE_URL, authenticated, async ctx => {

    const allRows = await Score.query();
    const numDeleted = await Score.query().delete();

    ctx.body = {
      success: allRows.length === numDeleted
    }
  })

}