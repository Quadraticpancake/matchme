//create connection here
var bluebird = require('bluebird');
var pgp = require('pg-promise')({promiseLib: bluebird});
var connectionString = process.env.DATABASE_URL||"postgres://postgres:test@localhost:5432/matchmaker";
// var connectionString = "postgres://matchmaker:quadraticpancake2016@matchmaker.c7schl94pgps.us-west-2.rds.amazonaws.com:5432/matchmaker";

//create new db instance
var db = pgp(connectionString);
module.exports = db;

// install postgres: https://www.moncefbelyamani.com/how-to-install-postgresql-on-a-mac-with-homebrew-and-lunchy/
// to test locally you must create a database 'matchmaker' in postgres
// and set up your postgres user to have password 'test'
    // alter role postgres with password 'test';
	// CREATE DATABASE matchmaker;
	// \connect matchmaker;

