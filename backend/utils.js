const fs = require('fs');
const path = require('path');

exports.readConfig = function readConfig(){
  let conf = fs.readFileSync(__dirname + path.sep + 'config.json', {
    encoding: 'utf8'
  });
  conf = JSON.parse(conf);
  return conf;
}