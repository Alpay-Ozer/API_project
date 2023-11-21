const {tables} = require('..');

module.exports = {
    up: async(knex) => {
        await knex.schema.createTable(tables.boek, (table) => {
            table.increments('id');
            table.string('title', 255).notNullable();
            table.string('coverImageSrc', 255).notNullable();
            table.string('genre', 255).notNullable();
            table.float('price', 9, 2).notNullable();
            table.string('description', 5000);
            table.integer('authorId').unsigned().notNullable();
            table.foreign('authorId', 'fk_boeken_auteur').references(`${tables.auteur}.authorId`).onDelete('CASCADE');
        })
    },

    down: (knex) => {
        return knex.schema.dropTableIfExists(tables.auteur);
    }
}