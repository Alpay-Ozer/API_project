const Router = require('@koa/router');
const boekenService = require('../service/boek');

const getAllBoeken = async (ctx) => {
  ctx.body = await boekenService.getAll();
};

const createBoek = async (ctx) => {
  const newBoek = await boekenService.create({
    ...ctx.request.body,
    id: Number(ctx.request.body.id),
  });
  ctx.body = newBoek;
};

const getBoekById = async (ctx) => {
  ctx.body = await boekenService.getById(Number(ctx.params.id));
};

const updateBoek = async (ctx) => {
  ctx.body = await boekenService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
    id: Number(ctx.request.body.id),
  });
};

const deleteBoek = async (ctx) => {
  await boekenService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/boeken',
  });

  router.get('/', getAllBoeken);
  router.post('/', createBoek);
  router.get('/:id', getBoekById);
  router.put('/:id', updateBoek);
  router.delete('/:id', deleteBoek);

  app.use(router.routes())
     .use(router.allowedMethods());
};
