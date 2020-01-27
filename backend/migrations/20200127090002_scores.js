
exports.up = knex => {
    return knex.schema
        .createTable('scoretables', table => {
            table.increments('id').primary();
            table.string('name', 50).unique().notNullable();
            table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
            table.bigInteger('createdAt').notNullable().defaultTo(knex.fn.now());
            table.bigInteger('updatedAt').notNullable().defaultTo(knex.fn.now());
        })

        .createTable('scores', table => {
            table.increments('id').primary()
            table.integer('points')
            table.string('userName', 50)
            table.integer('scoretable_id').unsigned().references('id').inTable('scoretables').onDelete('CASCADE')
            
          })
};

exports.down = knex => {
    return knex.schema
    .dropTableIfExists('scoretables')
    .dropTableIfExists('scores')
};
