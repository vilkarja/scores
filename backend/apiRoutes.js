const Score = require('./models/Score');
const User = require('./models/User');
const ScoreTable = require('./models/ScoreTable');

const passwordUtil = require('./utils/password');
const jwt = require('./utils/jwt');
const authenticated = require('./middleware/authenticated');

const SCORE_BASE_URL = '/api/scores'
const AUTH_BASE_URL = '/api/auth'

module.exports = router => {


  router.post(`${AUTH_BASE_URL}/login`, async ctx => {

    const {
      username,
      password
    } = ctx.request.body;
    if (!username) ctx.throw(400, 'Username required')
    if (!password) ctx.throw(400, 'Password required')

    const user = await User.query().where("username", username).first();

    if (!user) {
      ctx.throw(400, 'Password or username doesn\'t match')
    }

    const pwdMatch = await passwordUtil.comparePassword(password, user.password);

    if (pwdMatch) {
      const token = jwt.issueToken(user.id);
      const scoreBoard = await ScoreTable.query().where("user_id", user.id).first();

      ctx.body = {
        token: token,
        user: user,
        scoreBoard: scoreBoard
      }
    } else {
      ctx.throw(400, 'Password or username doesn\'t match')
    }

  });

  router.post(SCORE_BASE_URL, authenticated, async ctx => {

    const token = ctx.headers.authorization.split(' ')[1];
    const {
      user
    } = jwt.validateToken(token);

    const scoreBoard = await ScoreTable.query().where("user_id", user).first();

    if (scoreBoard.id === ctx.request.body.scoretable_id) {
      const insertedScore = await Score.query()
        .insert(ctx.request.body);

      ctx.body = insertedScore
    } else {
      ctx.throw(400, 'Wrong credentials')
    }

  })


  router.get(SCORE_BASE_URL, authenticated, async ctx => {

    const token = ctx.headers.authorization.split(' ')[1];
    const {
      user
    } = jwt.validateToken(token);

    const scoreBoard = await ScoreTable.query().where("user_id", user).first();
    const query = Score.query().where("scoretable_id", scoreBoard.id);

    if (ctx.query.orderBy) {
      query.orderBy('points', ctx.query.orderBy);
    }

    ctx.body = await query
  })

  router.patch(`${SCORE_BASE_URL}/:id`, authenticated, async ctx => {
    const numUpdated = await Score.query()
      .findById(ctx.params.id)
      .patch(ctx.request.body)

    ctx.body = {
      success: numUpdated == 1
    }
  })

  router.delete(`${SCORE_BASE_URL}/:id`, authenticated, async ctx => {
    const token = ctx.headers.authorization.split(' ')[1];
    const {
      user
    } = jwt.validateToken(token);

    const scoreBoard = await ScoreTable.query().where("user_id", user).first();
    const score = await scoreBoard
      .$relatedQuery('scores')
      .where('id', ctx.params.id)

    if (score.length === 0) {
      ctx.throw(400, 'Score not found')
    } else {
      const numDeleted = await scoreBoard
        .$relatedQuery('scores')
        .where('id', ctx.params.id)
        .delete();
      ctx.body = {
        success: numDeleted == 1
      }
    }
  })

  router.delete(`${SCORE_BASE_URL}/reset/:scoreboardId`, authenticated, async ctx => {

    const token = ctx.headers.authorization.split(' ')[1];
    const {
      user
    } = jwt.validateToken(token);

    const scoreBoard = await ScoreTable.query()
    .where("id", ctx.params.scoreboardId)
    .first();


    if (scoreBoard.user_id === user) {
      const allRows = await Score.query().where("scoretable_id", scoreBoard.id);
      const numDeleted = await Score.query().where("scoretable_id", scoreBoard.id).delete();

      ctx.body = {
          success: allRows.length === numDeleted
      }
    } else {
      ctx.throw(400, 'Wrong credentials')
    }
    
  })

}