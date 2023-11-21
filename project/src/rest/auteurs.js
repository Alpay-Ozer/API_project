const Router = require('@koa/router');
const auteurService = require('../service/auteur');


const getAllAuteurs = async (ctx) => {
  ctx.body = await auteurService.getAll();
};

const createAuteur = async (ctx) => {
  const newBoek = await auteurService.create({
    ...ctx.request.body,
    id: Number(ctx.request.body.id),
  });
  ctx.body = newBoek;
};

const getAuteurById = async (ctx) => {
  ctx.body = await auteurService.getById(Number(ctx.params.id));
};

const updateAuteur = async (ctx) => {
  ctx.body = await auteurService.updateById(Number(ctx.params.id), {
    ...ctx.request.body,
    id: Number(ctx.request.body.id),
  });
};

const deleteAuteur = async (ctx) => {
  await auteurService.deleteById(Number(ctx.params.id));
  ctx.status = 204;
};

/**
 * Install transaction routes in the given router.
 *
 * @param {Router} app - The parent router.
 */
module.exports = (app) => {
  const router = new Router({
    prefix: '/auteurs',
  });

  router.get('/', getAllAuteurs);
  router.post('/', createAuteur);
  router.get('/:id', getAuteurById);
  router.put('/:id', updateAuteur);
  router.delete('/:id', deleteAuteur);

  app.use(router.routes())
     .use(router.allowedMethods());
};
