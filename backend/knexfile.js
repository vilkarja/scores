// Update with your config settings.

module.exports = {

  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './scores.db'
    },
    pool: {
      afterCreate: (conn, cb) => {
        conn.run('PRAGMA foreign_keys = ON', cb)
      }
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'scores',
      // user:     'username',
      // password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};
