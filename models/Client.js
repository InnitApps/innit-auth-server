/**
 * Module dependencies
 */

var Modinha = require('modinha')
  , random  = Modinha.defaults.random
  ;


/**
 * Model definition
 */

var Client = Modinha.extend(null, {
  schema: {
    user_id:     { type: 'string', required: true },
  	type:        { type: 'string', required: true, enum: ['confidential', 'public'] },
  	name:        { type: 'string' },
  	website:     { type: 'string' },
  	description: { type: 'string' },
  	logo:        { type: 'string' },
  	terms:       { type: 'boolean' },
  	secret:      { type: 'string', default: random }
  }
});


/**
 * Exports
 */

module.exports = Client;