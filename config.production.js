var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL);
var path = require('path')

module.exports = {
  "local-ui" : path.resolve('app_ui/dist'), 
  "redis": {
    "url": process.env.REDISCLOUD_URL,
    "password" : redisURL.auth.split(":")[1]
  }
} 