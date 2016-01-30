import db from './config';
var request = require('request');
var zipcodes = require('zipcodes');
var _ = require('underscore');

///////////////// DB helpers /////////////////////

export function getUser (facebook_id) {
  console.log(facebook_id);
  // the syntax below is because facebook_id must be explictly passed as a string
  return db.query("SELECT * from users where facebook_id = '" + facebook_id + "';")
}


export function postUser (user) {
  console.log(user);
  var insertUserQueryStr = `INSERT INTO users(facebook_id,first_name,last_name,gender,birthday,zipcode,status,age_min,age_max,gender_preference,\
              location_preference,description,image_url) VALUES ('${user.facebook_id}','${user.first_name}','${user.last_name}','${user.gender}',\
              '${user.birthday}','${user.zipcode}','${user.status}',${user.age_min},${user.age_max},\
              '${user.gender_preference}',${user.location_preference},'${user.description}','${user.image_url}') returning *;`;
  console.log(insertUserQueryStr);
  return db.query(insertUserQueryStr)
  .then((rows) => {
    console.log('added entry', rows);
    return rows[0];
  })
  .catch((error) => {
    console.log(error);
  })
}


// get three random users, based on: http://stackoverflow.com/questions/8674718/best-way-to-select-random-rows-postgresql
export function getRandomUsers () {
  // the first query gets the size of the table
  return db.query("SELECT count(*) AS ct, min(user_id)  AS min_id, max(user_id)  AS max_id, max(user_id) - min(user_id) AS id_span FROM users;")
         .then((rows) => {
          // this is the actual query which pulls 3 random distinct rows from the users table using the size variables pulled in the first query
            return db.query(`SELECT * FROM  (\
                        SELECT DISTINCT 1 + trunc(random() * ${rows[0].id_span})::integer AS user_id \
                        FROM   generate_series(1, 4) g ) \
                        r JOIN users USING (user_id) LIMIT  3;`)
            });
}


// if pair not previously existing, create pair, otherwise, increment pair match count
export function addMatch (match) {
  var pairFormatted = {
    user_one: match.pair.target.user_id < match.pair.prospect.user_id ? match.pair.target.user_id : match.pair.prospect.user_id,
    user_two: match.pair.target.user_id > match.pair.prospect.user_id ? match.pair.target.user_id : match.pair.prospect.user_id
  }
  return db.query(`update pairs set times_matched = times_matched + 1 where pairs.user_one = ${ pairFormatted.user_one } and pairs.user_two = ${ pairFormatted.user_two } returning *;`)
    .then((rows) => {
      if (rows.length === 0) {
        return db.query(`insert into pairs (user_one, user_two, times_matched, connected) values (${ pairFormatted.user_one }, ${ pairFormatted.user_two }, 1, false) returning pair_id;`)
          .then((rows) => {
            return db.query(`insert into matches_made (matchmaker, pair) values (${ match.matchmaker.user_id || null }, ${ rows[0].pair_id });`)
          })
      } else {
      	return db.query(`insert into matches_made (matchmaker, pair) values (${ match.matchmaker.user_id || null }, ${ rows[0].pair_id });`)
      }
    })
// update pairs set times_matched = times_matched + 1 where pairs.user_one = 5 and pairs.user_two = 20;
}

// get one target and two suitable prospects
export function getMatchSet () {

  let matchSet = {};

  // gets a random user to be a match target
  return db.query("SELECT count(*) AS ct, min(user_id) AS min_id, max(user_id) AS max_id, max(user_id) - min(user_id) AS id_span FROM users;")
         .then((rows) => {
          // this is the actual query which pulls 1 random distinct rows from the users table using the size variables pulled in the first query
            return db.query(`SELECT * FROM  (\
                SELECT DISTINCT 1 + trunc(random() * ${rows[0].id_span})::integer AS user_id \
                FROM generate_series(1, 4) g ) \
                r JOIN users USING (user_id) LIMIT  1;`)
            })



          .then((targetRows) => {

            // get target out of row results

            let target = targetRows[0]

            let roughAge = (new Date()).getFullYear() - (new Date(target.birthday)).getFullYear()

            let maxBirthday = new Date(Date.now() - (target.age_max * 365 * 24 * 60 * 60 * 1000))
            let minBirthday = new Date(Date.now() - (target.age_min * 365 * 24 * 60 * 60 * 1000))

            let prospectsQuery = `SELECT * FROM users WHERE gender= '${target.gender_preference}' ` +
              `AND gender_preference='${target.gender}' `+
              // target is within correct age range
              `AND age_min<='${roughAge}' `+
              `AND age_max>='${roughAge}' `+
              // within target's age range
              `AND birthday<='${minBirthday.toISOString()}' `+
              `AND birthday>='${maxBirthday.toISOString()}' ` +
              `AND user_id!='${target.user_id}'`

            matchSet.target = target;
            return db.query(prospectsQuery);

          })
          .then((prospectRows) => {
            matchSet.prospects = _.shuffle(prospectRows).slice(0,2);
            return matchSet;
            
          })
}

export function getMatchmakerScore () {
  // select * from users inner join pairs on pairs.user_one = users.user_id or pairs.user_two = users.user_id on inner join matches_made on matches_made.matchmaker = 3 and matches_made.pair = pairs.pair_id;
 
}

// get all users

// get user by id

// get user by Facebook id

// get random user

// get user's connected pairs

// get set of potential matches filtered by an input users preferences