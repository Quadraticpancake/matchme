//create connection here
var bluebird = require('bluebird');
var pgp = require('pg-promise')({promiseLib: bluebird});
var connectionString = process.env.DATABASE_URL||"postgres://localhost:5432/matchmaker";

//create new db instance
var db = pgp(connectionString);
module.exports = db;

// install postgres: https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/
// to test locally you must create a database 'matchmaker' in postgres
	// CREATE DATABASE matchmaker;
	// \connect matchmaker;

