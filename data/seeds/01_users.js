exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('Users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('Users').insert([
            { email: 'me1@gmail.com', password: 'password123' },
            { email: 'me2@gmail.com', password: 'password123' },
            { email: 'me3@gmail.com', password: 'password123' },
            { email: 'me4@gmail.com', password: 'password123' },
            { email: 'me5@gmail.com', password: 'password123' },
      ]);
    });
};