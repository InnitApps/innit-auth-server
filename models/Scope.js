/**
 * Module dependencies
 */

var client   = require('../config/redis')
  , Modinha  = require('modinha')
  , Document = require('modinha-redis')
  , Service  = require('./Service')
  ;


/**
 * Model definition
 */

var Scope = Modinha.define('scopes', {
  _id: {
    type: 'string'
  },
  url: {
    type: 'string',
    uniqueId: true,
    required: true,
    format: 'url',
    after: encodeUrlBase64
  },
  description: {
    type: 'string',
    required: true
  },
  serviceId: {
    type: 'string',
    reference: Service
  }
});


/**
 * Encode URL Base64
 */

function encodeUrlBase64 (data) {
  this._id = new Buffer(this.url).toString('base64');
}


/**
 * Document persistence
 */

Scope.extend(Document);
Scope.__client = client;


/**
 * Exports
 */

module.exports = Scope;