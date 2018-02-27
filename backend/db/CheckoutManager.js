const {DatabaseManager} = require('./DatabaseManager');

class CheckoutManager extends DatabaseManager {

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
    WHERE id = ${sessionId}
    `);
  }

  /**
   * Checkout the order(s) associated with this session
   * @param {string} sessionUUID The session id to
   */
  checkoutSessionUsingUUID(sessionUUID){
    return this._query(`
    UPDATE \`session\`
    SET paid = b'1'
    WHERE uuid = '${sessionUUID}'
    `);
  }
  
}

exports.CheckoutManager = CheckoutManager;
