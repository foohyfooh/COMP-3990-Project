const fs = require('fs');
const path = require('path');

 function readConfig(){
  let contents;
  try{
    contents = fs.readFileSync(__dirname + path.sep + 'config.json', {encoding: 'utf8'});
  }catch(e){
    console.error('config.json file is missing from db module.');
    process.exit(0);
  }

  let conf;
  try{
    conf = JSON.parse(contents);
  }catch(e){
    console.error('config.json contains malformed JSON.');
    process.exit(0);
  }

  let requiredFields = ['host', 'database', 'user', 'password'];
  let missingRequired = false;
  for(let field of requiredFields){
    if(conf[field] === undefined){
      console.error(`${field} is a required field in config.json`);
      missingRequired = true;
    }
  }
  if(missingRequired) process.exit(0);
  
  return conf;
}

exports.readConfig = readConfig;
