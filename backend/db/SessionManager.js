const {DatabaseManager} = require('./DatabaseManager');

class SessionManager extends DatabaseManager {

  /**
   * Create a session for the customer
   * @param {number} table The table of the customer or 0 for takeout
   */
  async createSession(table){
    let insertResult = await this._query(`
    INSERT INTO session(\`table\`)
    VALUES (${table})
    `);
    return (this._query(`
    SELECT id, uuid
    FROM \`session\`
    WHERE id = ${insertResult.insertId}
    `))[0];
  }

}

exports.SessionManager = SessionManager;
