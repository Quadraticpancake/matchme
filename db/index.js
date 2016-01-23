//INDEX INTERACTS WITH CONTROLLER FILE IN SERVER

//init db
require('./schemas.js');

var db = require('./config');

//export functions to interact with controller
module.exports = {
  query: db.query,
  // all the sql string that are used in db.query
  sql: require('./psql'),

};