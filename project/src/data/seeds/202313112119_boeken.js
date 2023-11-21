const {tables} = require('..');

module.exports = {
    seed: async (knex) => {
        await knex (tables.boek).delete();

        await knex (tables.boek).insert([
            {id: 1, title: "To Kill a Mockingbird", coverImageSrc: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1553383690l/2657.jpg", genre: 'fiction', price: 14.47, description: "The unforgettable novel of a childhood in a sleepy Southern town and the crisis of conscience that rocked it, To Kill A Mockingbird became both an instant bestseller and a critical success when it was first published in 1960. It went on to win the Pulitzer Prize in 1961 and was later made into an Academy Award-winning film, also a classic.", authorId: 1},
        ]);
    },
};