exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
            { email: 'me1@gmail.com' },
            { email: 'me2@gmail.com' },
            { email: 'me3@gmail.com' },
            { email: 'me4@gmail.com' },
            { email: 'me5@gmail.com' },
      ]);
    });
};