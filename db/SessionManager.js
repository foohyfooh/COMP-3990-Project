const {DatabaseManager} = require('./DatabaseManager');

class SessionManager extends DatabaseManager {

  /**
   * Create a session for the customer
   * @param {number} table The table of the customer or 0 for takeout
   */
  async createSession(table){
    let insertResult = await this._query(`
    INSERT INTO session(\`table\`)
    VALUES (?)
    `, [table]);
    return (await this._query(`
    SELECT id, uuid
    FROM \`session\`
    WHERE id = ?
    `, [insertResult.insertId]))[0];
  }

  /**
   * Get session information
   * @param {number} sessionId 
   */
  async getSessionFromId(sessionId){
    return (await this._query(`
    SELECT *
    FROM \`session\`
    WHERE id = ?
    `, [sessionId]))[0];
  }

  /**
   * Get session information
   * @param {string} sessionUUID
   */
  async getSessionFromUUID(sessionUUID){
    return (await this._query(`
    SELECT *
    FROM \`session\`
    WHERE uuid = ?
    `, [sessionUUID]))[0];
  }

  /**
   * Checkout the order(s) associated with this session
   * @param {number | string} session The session(id or uuid) to checkout
   */
  async checkoutSession(session){
    return typeof(session) === 'number' ? this.checkoutSessionUsingId(session) : this.checkoutSessionUsingUUID(session);
  }

  /**
   * Checkout the order(s) associated with this session
   * @param {number} sessionId The session id to
   */
  checkoutSessionUsingId(sessionId){
    return this._query(`
    UPDATE \`session\`
    SET paid = b'1'
    WHERE id = ?
    `, [sessionId]);
  }

  /**
   * Checkout the order(s) associated with this session
   * @param {string} sessionUUID The session id to
   */
  checkoutSessionUsingUUID(sessionUUID){
    return this._query(`
    UPDATE \`session\`
    SET paid = b'1'
    WHERE uuid = ?
    `, [sessionUUID]);
  }

}

exports.SessionManager = SessionManager;
