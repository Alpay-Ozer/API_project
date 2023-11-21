const boekRepo = require('../repository/boek')

const getAll = async() => {

  const boeken = await boekRepo.findAll();
  return {items: boeken, count: boeken.length};
};

const getById = async(id) => {
    const boek = await boekRepo.findById(id);

    if(!boek){
      throw Error(`Geen boek met id ${id}`, {id});
    }

    return boek;
};

const create = async({ title, coverImageSrc, genre, price, description, authorName, authorId }) => {
  const id = await boekRepo.create({title, coverImageSrc, genre, price, description, authorName, authorId});
  return await getById(id);
};

const updateById = async (id, {title, coverImageSrc, genre, price, description, authorName, authorId}) => {
  await boekRepo.updateById(id, {
    title,
    coverImageSrc,
    genre,
    price,
    description,
    authorName,
    authorId
  });
  return await getById(id);
}

const deleteById = async(id) => {
  const deleted = await boekRepo.deleteById(id);

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



