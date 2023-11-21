const Router = require('@koa/router');
const installBoekenRouter = require('./boeken');
const installHealthRouter = require('./health');
const installAuteurRouter = require('./auteurs');

/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/api',
  });

  installAuteurRouter(router);
  installBoekenRouter(router);
  installHealthRouter(router);

  app.use(router.routes())
     .use(router.allowedMethods());
};
