const {DatabaseManager} = require('./DatabaseManager');

class CheckoutManager extends DatabaseManager {

  /**
   * Checkout the order(s) associated with this session
   * @param {number} sessionId The session to checkout
   */
  checkoutSession(sessionId){
    return this._query(`
    UPDATE \`session\`
    SET paid = b'1'
    WHERE id = ${sessionId}
    `);
  }

  /**
   * Perform a checkout for a takeout session
   * @param {string} sessionUUID The session to checkout
   */
  async checkoutTakeoutSession(sessionUUID){
    let session = await this._query(`
    SELECT id
    FROM \`session\`
    WHERE uuid = ${sessionUUID}
    `);
    return this.checkoutSession(session[0].id);
  }

  
}

exports.CheckoutManager = CheckoutManager;
