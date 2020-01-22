const { Model } = require('objection')

class Score extends Model {
  static get tableName() {
    return 'scores'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['points', 'userName'],

      properties: {
        id: { type: 'integer' },
  
        userName: { type: 'string', minLength: 1, maxLength: 50 },
        points: { type: 'number' },

      }
    }
  }

}

module.exports = Score
