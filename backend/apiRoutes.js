const Score = require('./models/Score');

const BASE_URL = '/api/scores'

module.exports = router => {


  router.post(BASE_URL, async ctx => {

    const insertedScore = await Score.query()
      .insert(ctx.request.body);

    ctx.body = insertedScore
  })




  router.get(BASE_URL, async ctx => {
    const query = Score.query();

    if (ctx.query.orderBy) {
      query.orderBy('points', ctx.query.orderBy);
    }

    ctx.body = await query
  })

  router.patch(`${BASE_URL}/:id`, async ctx => {
    const numUpdated = await Score.query()
      .findById(ctx.params.id)
      .patch(ctx.request.body)

    ctx.body = {
      success: numUpdated == 1
    }
  })

  router.delete(`${BASE_URL}/:id`, async ctx => {
    const numDeleted = await Score.query()
      .findById(ctx.params.id)
      .delete()

    ctx.body = {
      success: numDeleted == 1
    }
  })

  router.delete(BASE_URL, async ctx => {

    const allRows = await Score.query();
    const numDeleted = await Score.query().delete();

    ctx.body = {
      success: allRows.length === numDeleted
    }
  })

}