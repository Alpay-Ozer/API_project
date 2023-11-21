const {tables} = require('..');

module.exports = {
    up: async(knex) => {
        await knex.schema.createTable(tables.auteur, (table) => {
            table.increments('authorId');
            table.string('authorName', 255).notNullable(); // BEKIJKEN BIJ FOUT
            table.unique('authorName', 'idx_author_name_unique'); // BEKIJKEN BIJ FOUT
        })
    },

    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.auteur);
    }
}