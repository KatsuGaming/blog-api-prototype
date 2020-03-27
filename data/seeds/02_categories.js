
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Categories').del()
    .then(function () {
      // Inserts seed entries
      return knex('Categories').insert([
        { name: 'health' },
        { name: 'lifestyle' },
        { name: 'technology' },
        { name: 'pop culture' },
        { name: 'cooking' },
      ]);
    });
};
