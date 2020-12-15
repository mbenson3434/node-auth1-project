
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'megmeg', password: 'password'},
        {username: 'booboo', password: '1234'},
        {username: 'alice', password: 'pass'},
      ]);
    });
};
