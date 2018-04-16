const {DatabaseManager} = require('./DatabaseManager');

class ReviewManager extends DatabaseManager {
  
  /**
   * Add a review to the database for a session
   * @param {number} sessionId Session to review
   * @param {number} rating The value between 0 to 5 for the session
   * @param {string} comment Information for the review
   */
  postReview(sessionId, rating, comment){
    return this._query(`
    INSERT INTO review(id, rating, comment)
    VALUES(?, ?, ?)
    `, [sessionId, rating, comment]);
  }
}

exports.ReviewManager = ReviewManager;
