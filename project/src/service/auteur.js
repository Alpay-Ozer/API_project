const auteurRepo = require('../repository/auteur')

const getAll = async() => {

  const auteurs = await auteurRepo.findAll();
  return {items: auteurs, count: auteurs.length};
};

const getById = async(id) => {
    const auteur = await auteurRepo.findById(id);

    if(!auteur){
      throw Error(`Geen auteur met id ${id}`, {id});
    }

    return auteur;
};

const create = async({ authorName, authorId }) => {
  const id = await auteurRepo.create({authorName, authorId});
  return await getById(id);
};

const updateById = async (id, {authorName}) => {
  await auteurRepo.updateById(id, {
    authorName
  });
  return await getById(id);
}

const deleteById = async(id) => {
  const deleted = await auteurRepo.deleteById(id);

  if(!deleted){
    throw Error(`Geen boek met id ${id}`, {id});
  }
};


module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById
};



