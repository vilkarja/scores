
exports.up = function(knex) {
  return knex.schema
    .createTable("scores", table => {
        table.increments('id').primary();
        table.string('name', 50).notNullable();
        table.integer('score').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("scores");
};  
