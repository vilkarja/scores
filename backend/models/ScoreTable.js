const {
  Model
} = require('objection')

class ScoreTable extends Model {
  static get tableName() {
    return 'scoretables'
  }

  static get relationMappings() {
    const User = require('./User')
    const Score = require('./Score')
    return {
      owner: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'scoretables.user_id',
          to: 'users.id'
        }
      },
      scores: {
        relation: Model.HasManyRelation,
        modelClass: Score,
        join: {
          from: 'scoretables.id',
          to: 'scores.scoretable_id'
        }
      }
    }
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name'],

      properties: {
        id: {
          type: 'integer'
        },
        table_name: {
          type: 'string',
          minLength: 1,
          maxLength: 50
        },
        user_id: {
          type: ['integer', 'null']
        },

      }
    }
  }

}

module.exports = ScoreTable