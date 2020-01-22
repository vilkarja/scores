exports.up = knex => {
    return knex.schema
      .createTable('scores', table => {
        table.increments('id').primary()
        table.integer('points')
        table.string('userName', 50)
        
      })
      
  }
  
  exports.down = knex => {
    return knex.schema
      .dropTableIfExists('scores')
  }
  