/**
 * Configuration dependencies
 */

var cwd          = process.cwd()
  , env          = 'production' || 'development'
  , path         = require('path')  
  , config       = require(path.join(cwd, 'config.' + env + '.js'))
  , client       = require('./redis')(config.redis)
  , express      = require('express')
  , passport     = require('passport')
  , RedisStore   = require('connect-redis')(express)
  , sessionStore = new RedisStore({ client: client })
  , cors         = require('cors')
  ; 


/**
 * Exports
 */

module.exports = function (app) {

  app.configure(function () {

    // default settings
    app.set('port', process.env.PORT || config.port || 3000);
    app.set('local-ui', path.join(cwd, 'ui/app'));

    // config file settings
    Object.keys(config).forEach(function (key) {
      app.set(key, config[key]);
    });

    // request parsing
    app.use(express.cookieParser('secret'));
    app.use(express.bodyParser());
    
    // express session
    app.use(express.session({
      store: sessionStore,
      secret: 'asdf'
    }));

    // passport authentication middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // cross-origin support
    app.use(cors());
app.options('*', cors());
    // Explicitly register app.router
    // before error handling.
    app.use(app.router);

    // Error handler
    app.use(function (err, req, res, next) {   
      var error = (err.errors)
        ? { errors: err.errors }
        : { error: err.message, error_description: err.description };
      res.send(err.statusCode || 500, error);
    });

    // Static file server for UI
    if (app.settings['local-ui'] !== false) {
      app.use(express.static(app.settings['local-ui']))
    }
    
  });

};