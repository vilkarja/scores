const {
    Model
} = require('objection')

class User extends Model {
    static get tableName() {
        return 'users'
    }

    static get relationMappings() {
        const ScoreTable = require('./ScoreTable')
        return {
            scoretables: {
                relation: Model.HasManyRelation,
                modelClass: ScoreTable,
                join: {
                    from: 'users.id',
                    to: 'scoretables.user_id'
                }
            }
        }
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