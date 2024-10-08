const Koa = require('koa');
const config = require('config');
const bodyParser = require('koa-bodyparser');
const installRest = require('./src/rest');
const {initializeLogger, getLogger} = require('./src/core/logging');
const koaCors = require('@koa/cors');
const {initializeData} = require('../project/src/data')


const NODE_ENV = config.get('env');
const LOG_LEVEL = config.get('log.level');
const LOG_DISABLED = config.get('log.disabled');
const CORS_ORIGINS = config.get('cors.origins');
const CORS_MAX_AGE = config.get('cors.maxAge');

const main = async() => {


initializeLogger({
  level: LOG_LEVEL,
  disabled: LOG_DISABLED,
  defaultMeta: {NODE_ENV},
});

getLogger().info(`log level ${LOG_LEVEL}, disabled ${LOG_DISABLED} in env ${NODE_ENV}`);

await initializeData();

const app = new Koa();

app.use(
  koaCors({
    origin: (ctx) => { // 👈 4
      if (CORS_ORIGINS.indexOf(ctx.request.header.origin) !== -1) {
        return ctx.request.header.origin;
      }
      return CORS_ORIGINS[0];
    },
    allowHeaders: ['Accept', 'Content-Type', 'Authorization'], 
    maxAge: CORS_MAX_AGE, 
  })
);

app.use(bodyParser());

installRest(app);


app.listen(9000, () => {
  getLogger().info('🚀 Server listening on http://localhost:9000');
});
}

main();