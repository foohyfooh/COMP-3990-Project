const mysql =  require('promise-mysql');
const utils = require('./utils');
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
   * @param {any[]} [params] The values from the query
   */
  _query(q, params){
    if(this._connection)
      return this._connection.query(q, params);
    return Promise.reject('Connnection not established');
  }

  /** 
   * Disconnect from the MySQL database
  */
  disconnect(){
    if(!this._connection)
      return Promise.reject('Cannot disconnect from an unsestablished connection');
    this._connection.end();
  }

};

exports.DatabaseManager = DatabaseManager;
