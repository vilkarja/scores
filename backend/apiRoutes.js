const Score = require('./models/Score')

module.exports = router => {

  router.get("/testAdd", async ctx => {
    await Score.query().insert({
        userName: 'FirstOne',
        points: 100
      });

    const scores = Score.query();

    ctx.body = await scores;
  });
  
  router.post('/scores', async ctx => {
    const insertedGraph = await Score.transaction(async trx => {
      const insertedGraph = await Score.query(trx)
        .insert(ctx.request.body);

      return insertedGraph
    })

    ctx.body = insertedGraph
  })

  

  
  router.get('/scores', async ctx => {
    const query = Score.query()

    // query.debug();

    ctx.body = await query
  })

  router.patch('/scores/:id', async ctx => {
    const numUpdated = await Score.query()
      .findById(ctx.params.id)
      .patch(ctx.request.body)

    ctx.body = {
      success: numUpdated == 1
    }
  })

  router.delete('/scores/:id', async ctx => {
    const numDeleted = await Score.query()
      .findById(ctx.params.id)
      .delete()

    ctx.body = {
      success: numDeleted == 1
    }
  })

}
