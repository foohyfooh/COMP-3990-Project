const fs = require('fs');

exports.readConfig = function readConfig(){
  let conf = fs.readFileSync('./config.json', {
    encoding: 'utf8'
  });
  conf = JSON.parse(conf);
  return conf;
}