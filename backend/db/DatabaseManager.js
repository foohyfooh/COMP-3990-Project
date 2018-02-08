const mysql =  require('promise-mysql');
const utils = require('../utils');
const config = utils.readConfig();

class DatabaseManager {

  async connect(){
    try {
      this._connection = await mysql.createConnection(config);
    }catch(error){
      console.log(error);
    }
  }

  _query(q){
    if(this._connection)
      return this._connection.query(q)
    return Promise.reject('Connnection not established');
  }

  _sanitizeValue(value){
    return value;
  }

  disconnect(){
    if(this._connection)
      this._connection.end();
    return Promise.reject('Cannot disconnect from an unsestablished connection')
  }

};

exports.DatabaseManager = DatabaseManager;