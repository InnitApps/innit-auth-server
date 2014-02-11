var url = require('url');
var redisURL = url.parse(process.env.REDISCLOUD_URL);

module.exports = {
  "local-ui": "./ui/app", 
  "redis": {
    "url": process.env.REDISCLOUD_URL,
    "password" : redisURL.auth.split(":")[1]
  }
}