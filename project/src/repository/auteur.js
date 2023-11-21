const { getLogger } = require('../core/logging');
const {getKnex, tables} = require('../data');
const auteurs = require('../rest/auteurs');

const SELECT_COLUMNS = [
    `${tables.auteur}.authorId`, 'authorName', 'authorId'
]

const transformAuteur = ({authorName, authorId}) => {
    return {
        auteur: {
            authorName: authorName,
            authorId: authorId
        }
    }
}

const findAll = async() => {
    return await getKnex()(tables.auteur).select(SELECT_COLUMNS); //.orderBy('id', 'ASC');
}

const findById = async(id) => {
    const auteur = await getKnex() (tables.auteur).where(`${tables.auteur}.authorId`, id).first(SELECT_COLUMNS);
    return auteur && transformAuteur(auteur);
}

const create = async({authorName}) => {
    const [id] = await getKnex() (tables.auteur).insert({
        authorName,
    })
    return id;
}

const updateById = async (id, {authorName}) => {
    try{
        await getKnex()(tables.auteur).update({
            authorName,
        }).where(`${tables.auteur}.id`, id);
        return id;
    } catch(error){
        getLogger().error('Error in de updateById', {
            error
        });
        throw error;
    }
};

const deleteById = async(id) => {
    try{
        const rowsAffected = await getKnex()(tables.auteur).where(`${tables.auteur}.id`, id).delete();
        return rowsAffected > 0;
    } catch(error) {
        getLogger().error('Error in de deleteById', {
            error
        });
        throw error
    }
};


module.exports = {findAll, findById, create, updateById, deleteById};