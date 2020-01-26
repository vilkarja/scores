const {
    Model
} = require('objection')

class User extends Model {
    static get tableName() {
        return 'users'
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'password'],

            properties: {
                id: {
                    type: 'integer'
                },

                userName: {
                    type: 'string',
                    minLength: 1,
                    maxLength: 50
                },
                password: {
                    type: 'string',
                    minLength: 8
                },

            }
        }
    }

}

module.exports = User