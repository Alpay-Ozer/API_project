const {tables} = require('..');

module.exports = {
    seed: async (knex) => {
        await knex (tables.auteur).delete();

        await knex (tables.auteur).insert([
            {authorId: 1, authorName: 'Harper Lee'},
        ]);
    },
};