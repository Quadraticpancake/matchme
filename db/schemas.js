var db = require('./config.js');

//SCHEMAS ---------------------------------------------
//Cannot use USER as a table name || forbidden words: http://www.postgresql.org/docs/current/interactive/sql-keywords-appendix.html
export default function createTables () {
  return db.query("CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, "
   // .then(function(){
   //   console.log('user created');
   //   return db.query("CREATE TABLE IF NOT EXISTS users (user_name VARCHAR(40),"
    // from Facebook
      + " facebook_id VARCHAR(40),"
      + " first_name VARCHAR(40),"
      + " last_name VARCHAR(40),"
      + " gender VARCHAR(20),"
      + " birthday DATE,"
    // user inputs
     	+ " zipcode VARCHAR(5)," 
      + " status VARCHAR(20),"
      + " age_min INTEGER,"
      + " age_max INTEGER,"
      + " gender_preference VARCHAR(10),"
      + " location_preference INTEGER,"
      + " description VARCHAR(255));"
     	)
    //if you want to add additional basic schema fields to the user such as info, add it to the string here
   .then(function(){
    console.log('pair table created');
    return db.query("CREATE TABLE IF NOT EXISTS pairs (pair_id SERIAL PRIMARY KEY, user_one INTEGER, user_two INTEGER, FOREIGN KEY (user_one) REFERENCES users(user_id),"
      + " FOREIGN KEY (user_two) REFERENCES users(user_id), times_matched INTEGER, connected BOOLEAN);");
   })
   .then(function(){
    console.log('pair to matchmaker join table created')
    return db.query("CREATE TABLE IF NOT EXISTS matches_made (match_id SERIAL PRIMARY KEY, matchmaker INTEGER, pair INTEGER, FOREIGN KEY (matchmaker) REFERENCES users(user_id)," 
      + " FOREIGN KEY (pair) REFERENCES pairs(pair_id), created_at TIMESTAMP);");
   })
   .then(function(){
    console.log('subscription client join created')
    return db.query("CREATE TABLE IF NOT EXISTS messages (messages_id SERIAL PRIMARY KEY, pair_id INTEGER, sender INTEGER, FOREIGN KEY (pair_id) REFERENCES pairs(pair_id),"
      + " text VARCHAR(255),"
      + " created_at TIMESTAMP,"
      + " FOREIGN KEY (sender) REFERENCES users(user_id));");
   })
  .catch(function(error){
    console.log('error creating tables');
    console.log(error);
  });
}