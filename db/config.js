//create connection here
var bluebird = require('bluebird');
var pgp = require('pg-promise')({promiseLib: bluebird});
var connectionString = process.env.DATABASE_URL||"postgres://localhost:5432/matchmaker";

//create new db instance
var db = pgp(connectionString);
module.exports = db;

//to test locally you must create a database 'matchmaker' in postgres

