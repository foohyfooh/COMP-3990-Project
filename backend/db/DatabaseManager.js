const mysql =  require('promise-mysql');
const utils = require('../utils');
const config = utils.readConfig();

class DatabaseManager {

  /** 
   * Connect to the MySQL database
  */
  async connect(){
    try {
      this._connection = await mysql.createConnection(config);
    }catch(error){
      console.log(error);
    }
  }

  /**
   * Run a query on the database connection
   * @param {string} q MySQL query
   */
  _query(q){
    if(this._connection)
      return this._connection.query(q)
    return Promise.reject('Connnection not established');
  }

  /**
   * Sanitize a value to be put into the database
   * @param {*} value Value
   */
  _sanitizeValue(value){
    return value;
  }

  /** 
   * Disconnect from the MySQL database
  */
  disconnect(){
    if(this._connection)
      this._connection.end();
    return Promise.reject('Cannot disconnect from an unsestablished connection')
  }

};

exports.DatabaseManager = DatabaseManager;
