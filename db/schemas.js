var db = require('./config.js');

//SCHEMAS ---------------------------------------------
//Cannot use USER as a table name || forbidden words: http://www.postgresql.org/docs/current/interactive/sql-keywords-appendix.html
export default function createTables () {
  return db.query("CREATE TABLE IF NOT EXISTS users (user_id SERIAL PRIMARY KEY, "
   // .then(function(){
   //   console.log('user created');
   //   return db.query("CREATE TABLE IF NOT EXISTS users (user_name VARCHAR(40),"
    // from Facebook
      + " facebook_id VARCHAR(40) UNIQUE,"
      + " first_name VARCHAR(40),"
      + " last_name VARCHAR(40),"
      + " gender VARCHAR(20),"
      + " birthday DATE,"
    // user inputs
      + " zipcode CHAR(5),"
      + " status VARCHAR(20),"
      + " age_min INTEGER,"
      + " age_max INTEGER,"
      + " gender_preference VARCHAR(10)," // male, female, both
      + " location_preference CHAR(5),"
      + " description VARCHAR(350),"
      + " image_url VARCHAR(255),"
      + " score INTEGER, real BOOLEAN);"
     	)
    //if you want to add additional basic schema fields to the user such as info, add it to the string here
   .then(function(){
    console.log('pair table created');
    return db.query("CREATE TABLE IF NOT EXISTS pairs (pair_id SERIAL PRIMARY KEY, user_one INTEGER, user_two INTEGER, FOREIGN KEY (user_one) REFERENCES users(user_id),"
      + " FOREIGN KEY (user_two) REFERENCES users(user_id), connected BOOLEAN, user_one_heart BOOLEAN, user_two_heart BOOLEAN, closed BOOLEAN DEFAULT false);");
   })
   .then(function(){
    console.log('pair to matchmaker join table created')
    return db.query("CREATE TABLE IF NOT EXISTS matches_made (match_id SERIAL PRIMARY KEY, matchmaker INTEGER, pair INTEGER, FOREIGN KEY (matchmaker) REFERENCES users(user_id),"
      + " FOREIGN KEY (pair) REFERENCES pairs(pair_id), created_at TIMESTAMP NOT NULL DEFAULT NOW());");
   })
   .then(function(){
    console.log('user message join created')
    return db.query("CREATE TABLE IF NOT EXISTS messages (messages_id SERIAL PRIMARY KEY, pair INTEGER, sender INTEGER, FOREIGN KEY (pair) REFERENCES pairs(pair_id),"
      + " text VARCHAR(255),"
      + " created_at TIMESTAMP NOT NULL DEFAULT NOW(),"
      + " FOREIGN KEY (sender) REFERENCES users(user_id));");
   })
   // // create user to zipcode join table
   // .then(function(){
   //  console.log('user zipcode join created')
   //  return db.query("CREATE TABLE IF NOT EXISTS zipcodes (FOREIGN KEY (zipcode_id) REFERENCES users(zipcode),"
   //    + " text VARCHAR(255),"
   //    + " FOREIGN KEY (user) REFERENCES users(user_id));");
   // })
  .then(function(){
    console.log('picture join table created')
    return db.query("CREATE TABLE IF NOT EXISTS pictures (picture_id SERIAL PRIMARY KEY, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(user_id),"
      + " image_url VARCHAR(255),"
      + " created_at TIMESTAMP NOT NULL DEFAULT NOW());");
  })
  .then(function(){
    console.log('face anaytics table created')
    return db.query("CREATE TABLE IF NOT EXISTS analytics (analytics_id SERIAL PRIMARY KEY, user_id INTEGER, FOREIGN KEY (user_id) REFERENCES users(user_id),"
      + "age INTEGER,"
      + "coloring VARCHAR(40),"
      + "expression DECIMAL,"
      + "faceShape DECIMAL,"
      + " created_at TIMESTAMP NOT NULL DEFAULT NOW());");
  })
  // .then(function(){
  //   console.log('creating trigger to expire old matches')
  //   return db.query("CREATE FUNCTION matches_made_delete_old() RETURNS trigger "
  //  + "LANGUAGE plpgsql "
  //  + "AS $$ "
  //  + "BEGIN "
  //  + "DELETE FROM matches_made WHERE created_at < NOW() - INTERVAL '1 month'; "
  //  + "RETURN NEW; "
  //  + "END; "
  //  + "$$; "
  //  + "CREATE TRIGGER matches_made_delete_trigger "
  //  + "AFTER INSERT ON matches_made "
  //  + "EXECUTE PROCEDURE matches_made_delete_old();");
  // })
  .catch(function(error){
    console.log('error creating matches deletion function');
    console.log(error);
  });
}





