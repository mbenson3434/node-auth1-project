const db = require('../../database/db-config');

module.exports = {
    get,
    getById,
    insert
  };

  function get() {
    return db('users');
  }

  function getById(id) {
    return db('users')
      .where({ id })
      .first();
  }

  function insert(user) {
    return db('users')
      .insert(user)
      .then(ids => {
        return getById(ids[0]);
      });
  }