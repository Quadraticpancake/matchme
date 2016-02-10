import db from './config';
var request = require('request');
var _ = require('underscore');
import generateUserAnalytics from '../server/faceAnalysis/faceAnalysis';

var userCount = null;

///////////////// DB helpers /////////////////////

export function getUser (facebook_id) {

  // the syntax below is because facebook_id must be explictly passed as a string
  return db.query("SELECT *, to_char(birthday, 'YYYY-MM-DD') as birthday from users where facebook_id = '" + facebook_id + "';");
}

export function postUser (user) {
  var userInfo = null;
  var insertUserQueryStr = `INSERT INTO users(facebook_id,first_name,last_name,gender,zipcode,status,age_min,age_max,gender_preference,\
              location_preference,description,image_url,score,real) VALUES ('${user.facebook_id}','${user.first_name}','${user.last_name}', \
              '${user.gender}', '${user.zipcode}','${user.status}',${user.age_min},${user.age_max},\
              '${user.gender_preference}',${user.location_preference},'${user.description}','${user.image_url}',0,true) returning *;`;

  return db.query(insertUserQueryStr)
  .then((rows) => {
    userCount++;
    userInfo = rows[0];
    return rows[0];
  })
  .then((row) => {
    var insertPictureQueryStr = `INSERT INTO pictures (user_id, image_url) VALUES ('${row.user_id}','${user.image_url}') returning *;`;
    return db.query(insertPictureQueryStr);
  })
  .then((rows) => {
    return generateUserAnalytics(rows[0].user_id, rows[0].image_url);
  })
  .then((rows) => {
    console.log('RETURNING USER INFO in DB HELPERS')
    return userInfo;
  })
  .catch((error) => {
    console.log(error);
  });
}

export const putUser = (userID, userInfo) => {

  const {first_name, last_name, gender, gender_preference, age_min, age_max, description,
         image_url, birthday, status} = userInfo;
  var queryStr = `UPDATE users SET first_name = '${first_name}', last_name = '${last_name}', \
                  gender = '${gender}', gender_preference = '${gender_preference}', age_min = '${age_min}', \
                  age_max = '${age_max}', description = '${description}', image_url = '${image_url}',
                  birthday = '${birthday}', status = '${status}' \
                  WHERE user_id = ${userID} returning *;`;

  return db.query(queryStr)
    .then((rows) => {
      return rows;
    })
    .catch((error) => {
      console.log(error);
    });
};


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
  /* Here is what the query below does.
  first the matchmaker's score is increased by 10
  the "i" sees if pairs already has an entry for that pair
  If it doesn't a new entry gets insterted.
  the "p" gets the unique pair_id pertaining to that pair. This will always be one pair_id
  unless it is a new pair in which case there will be 0 rows
  the "temp" just inserts the entry into the matchmaker table with the single value returned
  from either p or i depending on if the pair existed (from p) or is new (from i). The union all
  table will ALWAYS have exactly one entry.
  finally, having inserted the new match we return all the existing matches with the same pair.
  if we end up with n matches the statement will return n - 1 matches. Thus, on the creation of a
  new pair we have 0 rows returned.
  */
  var matchQuery = `with score as (update users set score = score + 10 where user_id = \
    ${ match.matchmaker.user_id }), \
    i as (insert into pairs (user_one, user_two, connected, user_one_heart, user_two_heart) \
    select ${ pairFormatted.user_one }, ${ pairFormatted.user_two }, false, false, false  \
    where not exists (select * from pairs where user_one = ${ pairFormatted.user_one } and  \
    user_two = ${ pairFormatted.user_two }) returning pair_id), p as (select pair_id from  \
    pairs where pairs.user_one = ${ pairFormatted.user_one } and pairs.user_two = \
    ${ pairFormatted.user_two }), temp as (insert into matches_made (matchmaker, pair) values \
    (${ match.matchmaker.user_id }, (select pair_id from p union all select pair_id from i))) \
    select matches_made.matchmaker, matches_made.pair from matches_made join p on p.pair_id = matches_made.pair;`;
    //console.log(matchQuery);
  return db.query(matchQuery)
    .then((rows) => {
      var threshold = 1;
      if (rows.length === threshold) { // we have "crossed" the threshold (we have threshold +1 matches)
        var matchmakersStr = '' + rows[0].matchmaker;
        for (var i = 1; i < rows.length; i++) {
          matchmakersStr += ', ' + rows[i].matchmaker;
        }
        var onConnectionQuery = `with score as (update users set score = score + 200 where user_id = \
          ${ match.matchmaker.user_id }), allscore as (update users set score = score + 100 where user_id in \
          (${ matchmakersStr })) update pairs set connected = true where pair_id = \
          ${ rows[0].pair } returning *;`
        
        return db.query(onConnectionQuery);
      } else {
        return false; // No connection occured
      }
    });
}

// get one target and two suitable prospects
export function getMatchSet (user_id) {
  var func = function (user_id) {
        var randomUserId = Math.floor(Math.random() * userCount) + 1;
        // console.log(userCount);
        // console.log(user_id, "user_id 1");
        /*
        while (randomUserId === user_id) {
          randomUserId = Math.floor((Math.random() * userCount) + 1;
        }
        */
        var date = new Date();
        var month = date.getMonth();
        var day = date.getDate()
        month = month.length < 2 ? '0' + month : month;
        day = day.length < 2 ? '0' + day : day;
        var dateStr = '' + month + '/' + day + '/' + date.getFullYear();
        var q = `with target as (select * from users where user_id = ${ randomUserId }) select * from users  \
          where ('${dateStr}' - birthday) > (365.25 * (select age_min from target)) and ('${dateStr}' - birthday) <  \
          (365.25 * (select age_max from target)) and ('${dateStr}' - (select birthday from target)) > \
          (365.25 * age_min) and ('${dateStr}' - (select birthday from target)) < (365.25 * age_max) and \
          user_id <> (select user_id from target) and (gender = (select  \
          gender_preference from target) or (select gender_preference from target) = 'both')  \
          and (gender_preference = (select gender from target) or gender_preference = 'both') union all  \
          (select * from target) union all (select * from users where user_id = ${ user_id });`
        // console.log(q);
        return db.query(q)
          .then((rows) => {
            var matchmaker = rows.pop();
            var target;
            var score;
            // console.log(matchmaker.user_id, "!==", user_id);
            if (matchmaker.user_id !== user_id) {
              target = matchmaker;
              score = -1 // or null
            } else {
              target = rows.pop();
              score = matchmaker.score;
            }
            var prospects = _.shuffle(rows).slice(0,2);
            // console.log("score =", score, "target =", target.first_name);
            // console.log(prospects[0].first_name, prospects[1].first_name);
            prospects.push(target);
            // console.log(prospects);
            return {score: score, candidates: prospects};
          });
  }
 // let matchSet = {};
  if(!user_id) {
    user_id = 0;
  }
  if (!userCount) {
    return db.query('SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1;')
      .then((row) => {
        userCount = row[0].user_id;
        return func(user_id);
    });
  } else {
    return func(user_id);
  }
}

export function getMatchesMade (matchmaker) {
  // the query below will return all the information for who user one is and who user two is.
  // select pairs.pair_id, u1.*, u2.* from matches_made join pairs on matches_made.matchmaker = 3 and matches_made.pair = pairs.pair_id join users u1 on u1.user_id = pairs.user_one join users u2 on u2.user_id = pairs.user_two;

  var getMatchesStr = `select pairs.pair_id, pairs.connected, pairs.user_one_heart, pairs.user_two_heart, \
   uMatchmaker.score, \
  u1.user_id as user_id1, u1.facebook_id as facebook_id1,  \
  u1.first_name as first_name1, u1.last_name as last_name1, u1.gender as gender1, u1.birthday as birthday1,  \
  u1.zipcode as zipcode1, u1.status as status1, u1.age_min as age_min1, u1.age_max as age_max1,  \
  u1.gender_preference as gender_preference1, u1.location_preference as location_preference1,  \
  u1.description as description1, u1.image_url as image_url1,  \
  u2.user_id as user_id2, u2.facebook_id as facebook_id2,  \
  u2.first_name as first_name2, u2.last_name as last_name2, u2.gender as gender2, u2.birthday as birthday2,  \
  u2.zipcode as zipcode2, u2.status as status2, u2.age_min as age_min2, u2.age_max as age_max2,  \
  u2.gender_preference as gender_preference2, u2.location_preference as location_preference2,  \
  u2.description as description2, u2.image_url as image_url2 from matches_made join pairs \
  on matches_made.matchmaker = ${ matchmaker } and matches_made.pair = pairs.pair_id \
  join users u1 on u1.user_id = pairs.user_one join users u2 on u2.user_id = pairs.user_two \
  join users uMatchmaker on uMatchmaker.user_id = ${ matchmaker };`

  return db.query(getMatchesStr)
    .then((rows) => {
      var output = [];
      var pairsSeen = {};
      for (var i = 0; i < rows.length; i++) {
        if (!pairsSeen[rows[i].pair_id] && rows[i].connected === true) {
          var obj = {user_one: {}, user_two: {}};
          pairsSeen[rows[i].pair_id] = true;
          for (var key in rows[i]) {
            if (key.charAt(key.length - 1) === '2') {
              obj.user_two[key.substr(0, key.length - 1)] = rows[i][key];
            } else if (key.charAt(key.length - 1) === '1') {
              obj.user_one[key.substr(0, key.length - 1)] = rows[i][key];
            }
          }
          obj.pairHeart = rows[i].user_one_heart && rows[i].user_two_heart;
          output.push(obj);
        }
      }
      if (rows.length > 0) { // true if there has been a match event
        return {score: rows[0].score, pairs: output};
      } else {
        return db.query('select score from users where user_id = ' + matchmaker)
          .then((score_row) => {
            return {score: score_row[0].score, pairs: []};
          })
      }
    });
}

export function getAlbum (user_id) {
  var getAlbumQueryStr = `select image_url from pictures where user_id = ${user_id};`;

  return db.query(getAlbumQueryStr)
  .then((rows) => {
    return rows;
  })
  .catch((error) => {
    console.log(error);
  });
}

export function postAlbum (user_id, image_url) {
  var postAlbumQueryStr = `INSERT INTO pictures (user_id, image_url) VALUES ('${user_id}','${image_url}') returning *;`;
  return db.query(postAlbumQueryStr)
    .then((rows) => {
    return rows; // this doesn't really do anything
  })
  .catch((error) => {
    console.log(error);
  });
}

export function putPicture (user_id, image_url) {
  var insertPictureQueryStr = `UPDATE users SET image_url = '${image_url}'  WHERE user_id = ${user_id};`;

  return db.query(insertPictureQueryStr)
  .then((rows) => {
    return rows;
  })
  .catch((error) => {
    console.log(error);
  });
}

// get recommendation
export function postRecommendation(user_id, user_gender, user_preference) {
// get the user ids of the matches the user has hearted

  let getLikesQuery = `select * from pairs where user_one = ${ user_id } and user_one_heart =true or user_two = ${ user_id } and user_two_heart =true`;
  return db.query(getLikesQuery)
  .then((rows) => {
    let result = [];
    for (var i = 0; i < rows.length -1; i++) {
      result.push(rows[i].user_one);
      result.push(rows[i].user_two);
    }
    return _.without(result, parseInt(user_id)); // returns an array containing many instances of the target user_id
  })

  .then((liked) => {
    // get the analytics info of the hearted users, compile into the ideal
    let queryIds = ' user_id = ' + liked[0];
    liked.slice(1).forEach(function(item) {
      queryIds += ' OR user_id= ' + item;
    });

    let getLikedSetQuery = `select * from analytics where ` + queryIds + `;`;
    return db.query(getLikedSetQuery) 
    .then((rows) => {

      let totalAge = 0;
      let totalColoring = [];
      let totalExpression = 0;
      let totalFaceShape = 0;

      rows.forEach(function(item) {
        totalAge += item.age;
        totalExpression += parseInt(item.expression);
        totalFaceShape += parseInt(item.faceshape);
        totalColoring.push(item.coloring);
      });

      function mode(array) {
          if(array.length === 0)
            return null;
          var modeMap = {};
          var maxEl = array[0], maxCount = 1;
          for(var i = 0; i < array.length; i++) {
            var el = array[i];
            if(modeMap[el] == null)
              modeMap[el] = 1;
            else
              modeMap[el]++;  
            if(modeMap[el] > maxCount)
            {
              maxEl = el;
              maxCount = modeMap[el];
            }
          }
          return maxEl;
      };

      let ideal = {
        age: totalAge / rows.length,
        coloring: mode(totalColoring),
        expression: totalExpression / rows.length,
        faceShape: totalFaceShape / rows.length
      };
      return {ideal: ideal, liked: liked, user_id: user_id};
    });
  })
  .then((result) => {
    // get a set of recommendations
    let idealAgeMin = result.ideal.age - 5;
    let idealAgeMax = result.ideal. age + 5;
    let idealExpressionMin = result.ideal.expression - 10;
    let idealExpressionMax = result.ideal.expression + 10;
    let idealFaceMin = result.ideal.faceShape - .2;
    let idealFaceMax = result.ideal.faceShape + .2;
    let idealColoring = result.ideal.coloring;

    let queryAlreadyConnected = '';
    result.liked.forEach(function(item) {
      queryAlreadyConnected += ' AND user_id <> ' + item;
    }); 

    let getRecQuery = `select user_id from analytics where` +
       ` age < ${ idealAgeMax } and age > ${ idealAgeMin }` +
       ` and expression < ${ idealExpressionMax } and expression > ${ idealExpressionMin }` +
       ` and faceShape < ${ idealFaceMax } and faceShape > ${ idealFaceMin }` +
       ` and coloring = '${ idealColoring }'` +
       ` and user_id <> ${ result.user_id }`
       + queryAlreadyConnected + ';';

     return db.query(getRecQuery)

     .then((rows) => {
       // rows is an array of potential user_ids
       let userQueryString = '';
       rows.forEach(function(item) {
         userQueryString += ' or user_id=' + item.user_id;
       });

       let preferencesQuery = `select * from users where gender='${user_preference}' and gender_preference='${user_gender}'` + userQueryString;
       if (user_preference = 'none') {
        preferencesQuery = `select * from users where gender_preference='${user_gender}'` + userQueryString;
       }
       return db.query(preferencesQuery);
     })
     .then((rows) => {
       return _.shuffle(rows)[0];
     })
     .catch((error) => {
       console.log(error);
     });
  });

};


export function buyCandidate (purchaseInfo) {
  var user_one = purchaseInfo.user < purchaseInfo.candidate ? purchaseInfo.user : purchaseInfo.candidate;
  var user_two = purchaseInfo.user > purchaseInfo.candidate ? purchaseInfo.user : purchaseInfo.candidate;
  var buyCandidateQueryStr = `with i as (insert into pairs (user_one, user_two, connected, user_one_heart, user_two_heart) \
    select ${ user_one }, ${ user_two }, true, false, false where not exists (select * from pairs where user_one  \
    = ${ user_one } and user_two = ${ user_two })), p as (update pairs set connected = true  \
    where pairs.user_one = ${ user_one } and pairs.user_two = ${ user_two }) update users set score = score + ${ purchaseInfo.scoreChange } where user_id = \
    ${ purchaseInfo.user } returning score;`
  
  return db.query(buyCandidateQueryStr)
    .then((row) => {
      if (row.length > 0) {
        return row[0].score;
      } else {
        return null;
      }
    });
}


