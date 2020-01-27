exports.up = knex => {
    return knex.schema
        .createTable('users', table => {
            table.increments('id').primary();
            table.string('username', 50).unique().notNullable();
            table.string('password').notNullable();

            table.bigInteger('createdAt').notNullable().defaultTo(knex.fn.now());
            table.bigInteger('updatedAt').notNullable().defaultTo(knex.fn.now());
        })
};

exports.down = knex => {
    return knex.schema.dropTableIfExists('users')
};