const db = require('../../database/db-config');

module.exports = {
    get,
    getById,
    getBy,
    insert
  };

  function get() {
    return db('users');
  }

  function getBy(filter) {
    return db("users").where(filter)
      .orderBy("id");
  }

  function getById(id) {
    return db('users')
      .where({ id })
      .first();
  }

  async function insert(user) {
    const [id] = await db("users")
      .insert(user, "id");
      return getById(id);
  }