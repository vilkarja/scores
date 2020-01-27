const { Model } = require('objection')

class Score extends Model {
  static get tableName() {
    return 'scores'
  }

  static get relationMappings() {
    const ScoreTable = require('./ScoreTable')
    return {
        scoretable: {
            relation: Model.BelongsToOneRelation,
            modelClass: ScoreTable,
            join: {
                from: 'scores.scoretable_id',
                to: 'scoretables.id'
            }
        }
    }
}

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['points', 'userName'],

      properties: {
        id: { type: 'integer' },
  
        userName: { type: 'string', minLength: 1, maxLength: 50 },
        points: { type: 'number' },
        scoretable_id: { type: ['integer', 'null'] },

      }
    }
  }

}

module.exports = Score
