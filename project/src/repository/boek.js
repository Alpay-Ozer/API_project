const { getLogger } = require('../core/logging');
const {getKnex, tables} = require('../data');
const boeken = require('../rest/boeken');

const SELECT_COLUMNS = [
    `${tables.boek}.id`, 'id', 'title', 'coverImageSrc', 'genre', 'price', 'description', `${tables.auteur}.authorName as authorName`, `${tables.auteur}.authorId as authorId`
]

const transformBoek = ({id, title, coverImageSrc, genre, price, description, authorName, authorId}) => {
    return {
        boek: {
            id: id,
            title: title,
            coverImageSrc: coverImageSrc,
            genre: genre,
            price: price,
            description: description,
            authorName: authorName,
            authorId: authorId
        }
    }
}

const findAll = async() => {
    return await getKnex()(tables.boek).join(tables.auteur, `${tables.boek}.authorId`, '=', `${tables.auteur}.authorId`).select(SELECT_COLUMNS); //.orderBy('id', 'ASC'); // NOG DOEN
}

const findById = async(id) => {
    const boek = await getKnex() (tables.boek).join(tables.auteur, `${tables.boek}.authorId`, '=', `${tables.auteur}.authorId`).where(`${tables.boek}.id`, id).first(SELECT_COLUMNS);
    return boek && transformBoek(boek);
}

const create = async({title, coverImageSrc, genre, price, description, authorId}) => {
    const [id] = await getKnex() (tables.boek).insert({
        title,
        coverImageSrc,
        genre,
        price,
        description,
        authorId
    })
    return id;
}

const updateById = async (id, {title, coverImageSrc, genre, price, description, authorId}) => {
    try{
        await getKnex()(tables.boek).update({
            title,
            coverImageSrc,
            genre,
            price,
            description,
            authorId
        }).where(`${tables.boek}.id`, id);
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
        const rowsAffected = await getKnex()(tables.boek).where(`${tables.boek}.id`, id).delete();
        return rowsAffected > 0;
    } catch(error) {
        getLogger().error('Error in de deleteById', {
            error
        });
        throw error
    }
};


module.exports = {findAll, findById, create, updateById, deleteById};