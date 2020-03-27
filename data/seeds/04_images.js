exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Images').del()
    .then(function () {
      // Inserts seed entries
      return knex('Images').insert([
        { blog_id: 1, user_id: 1, path: "./image1" },
        { blog_id: 2, user_id: 2, path: "./image2" },
        { blog_id: 3, user_id: 3, path: "./image3" },
        { blog_id: 4, user_id: 4, path: "./image4" },
        { blog_id: 5, user_id: 5, path: "./image5" },
      ]);
    });
};
