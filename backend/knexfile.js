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
      database: 'scores'
    },
    pool: {
      min: 2,
      max: 10
    }
  }
}
