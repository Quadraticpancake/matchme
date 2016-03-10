import db from './config';
var request = require('request');
var _ = require('underscore');
import generateUserAnalytics from '../server/faceAnalysis/faceAnalysis';

var Queue = function () {
  var output = {};
  output._first = null;
  output._last = null;
  output._size = 0;
  var node = function (val) {
    return {value: val, next: null};
  }
  output.getSize = function () {
    return this._size;
  }
  output.enqueue = function (val) {
    if (this._first) {
      this._last.next = node(val);
      this._last = this._last.next;
    } else {
      this._first = node(val);
      this._last = this._first;
    }
    this._size++;
  }
  output.dequeue = function () {
    if (this._first) {
      var result = this._first.value;
      this._first = this._first.next;
      this._size--;
      return result;
    } else {
      return null;
    }
  }
  return output;
}

var triadsStore = Queue();

//var triadsStore = [];

var replenishingTriads = false;

getMatchSet();

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
              '${user.gender_preference}',${user.location_preference},'${user.description}','${user.image_url}',0,false) returning *;`;

  return db.query(insertUserQueryStr)
  .then((rows) => {
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
  // Add in a second prospect query so that there is 0 correlation between first prospect and second prospect.
  var func = function () {
    return db.query('SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1;')
      .then((row) => {
        // Grabs 101 random numbers from 1 to number of users that will be targets.
        var userCount = row[0].user_id
        var createTargetsQuery = function () {
          var randomUserIdsStr = '' + Math.floor(Math.random() * userCount) + 1;
          for (var i = 0; i < 100; i++) {
            randomUserIdsStr += ', ' + (Math.floor(Math.random() * userCount) + 1);
          }
          return `select * from users where user_id in ( ${randomUserIdsStr} );`
        }
        // Grabs a random range of 1000 of the total number of users and selects them all.
        var createProspectsQuery = function () {
          var sample_min = Math.floor(Math.random() * userCount) + 1;
          var prospectRangeStr = ' user_id >= ' + sample_min + ' or user_id <= ';
          var prospectCount = 1000;
          if (sample_min + prospectCount <= userCount) {
            prospectRangeStr += (sample_min + prospectCount);
          } else {
            prospectRangeStr += (sample_min - userCount + prospectCount);
          }
          return `select * from users where ${ prospectRangeStr };`;
        }
        var targetsQuery = createTargetsQuery();
        var prospectsQuery1 = createProspectsQuery();
        var prospectsQuery2 = createProspectsQuery();
        var date = new Date();
        var month = date.getMonth();
        var day = date.getDate()
        month = month.length < 2 ? '0' + month : month;
        day = day.length < 2 ? '0' + day : day;
        var dateStr = '' + month + '/' + day + '/' + date.getFullYear();
        // returns the age of a person based on the current date.
        var age = function(person) {
          if (person.birthday) {
            var date = new Date();
            var month = person.birthday.getMonth();
            var day = person.birthday.getDate();
            var year = person.birthday.getFullYear();
            var output = date.getFullYear() - year;
            if (month > date.getMonth()) {
              return output;
            } else if (month < date.getMonth()) {
              return output - 1;
            } else if (day >= date.getDate()) {
              return output;
            } else {
              return output - 1;
            }
          } else {
            return false;
          }
        }

        // returns if two people are a match based on user_id, gender_preferences, and age
        var match = function (p1, p2) {
          return (p1.gender === p2.gender_preference || p2.gender_preference === 'both')
            && (p2.gender === p1.gender_preference || p1.gender_preference === 'both')
            && p1.user_id !== p2.user_id && age(p2) !== false && age(p1) !== false
            && p1.age_min <= age(p2) && p2.age_min <= age(p1) && p2.age_max >= age(p1) && p1.age_max >= age(p2);
        }
        return db.query(targetsQuery)
          .then((targetRows) => {
            return db.query(prospectsQuery1)
              .then((prospectRows1) => {
                return db.query(prospectsQuery2)
                  .then((prospectRows2) => {
                    prospectRows1 = _.shuffle(prospectRows1);
                    prospectRows2 = _.shuffle(prospectRows2);
                    var target;
                    var prospect1 = null;
                    var prospect2 = null;
                    var prospectIterator1 = 0;
                    var prospectIterator2 = 0;
                    for (var i = 0; i < targetRows.length; i++) {
                      target = targetRows[i];
                      for (prospectIterator1; (prospectIterator1 < prospectRows1.length && !prospect1); prospectIterator1++) {
                        if (prospectRows1[prospectIterator1] && match(target, prospectRows1[prospectIterator1])) {
                          prospect1 = (prospectRows1[prospectIterator1]);
                          prospectRows1[prospectIterator1] = null;
                        }
                      }
                      for (prospectIterator2; (prospectIterator2 < prospectRows2.length && !prospect2); prospectIterator2++) {
                        if (prospectRows2[prospectIterator2] && match(target, prospectRows2[prospectIterator2])) {
                          prospect2 = (prospectRows2[prospectIterator2]);
                          prospectRows2[prospectIterator2] = null;
                        }
                      }
                      if (prospectIterator1 === prospectRows1.length) {
                        prospectIterator1 = 0;
                      }
                      if (prospectIterator2 === prospectRows2.length) {
                        prospectIterator2 = 0;
                      }
                      if (prospect1 && prospect2 && prospect1.user_id !== prospect2.user_id) {
                        triadsStore.enqueue({target: target, prospects: [prospect1, prospect2]})
                      }
                      prospect1 = null;
                      prospect2 = null;
                    }
                    replenishingTriads = false;
                    return;
                  });
              });
          });
      });
  };

  // Single triad version of app
  /*
  var getTriads = function (user_id) {
    var triad;
    while (triadsStore.length > 0) {
      triad = triadsStore.pop();
      if (triad && triad.target.user_id !== user_id && triad.prospects[0].user_id !== user_id && triad.prospects[1].user_id !== user_id) {
        return triad;
      }
    }
  }
*/
  var getTriads = function (user_id) {
    var triad = triadsStore.dequeue();
    if (!triad || triadsStore.getSize() < 2) {
      // should throw exception
    } else {
      // To ensure the queue is NEVER empty;
      if (triad.target.user_id === user_id || triad.prospects[0].user_id === user_id || triad.prospects[1].user_id === user_id) {
        // We need to get another triad because we can't return one with user included
        return getTriads(user_id);
      } else if (triadsStore.getSize() < 150) {
        // To ensure the queue is NEVER empty;
        triadsStore.enqueue(triad);
      }
    }
    return triad;
  }

  /*
  //triad array version of app
  var getTriads = function (user_id) {
    var count = 0;
    var output = [];
    while(count < 10) {
      var triad = triadsStore.pop();
      if (triad && triad.target.user_id !== user_id && triad.prospects[0].user_id !== user_id && triad.prospects[1].user_id !== user_id) {
        output.push(triad);
        count++;
      } else if (!triad) {
        count++;
      }
    }
    return output;
  }
  */
  if (triadsStore.getSize() < 350 && replenishingTriads === false) {
    console.log(triadsStore.getSize());
    replenishingTriads = true;
    func();
  // triadsStore getting way low
  }
  console.log('LOOK HERE', triadsStore.getSize());
  return getTriads();
}

export function getMatchesMade (matchmaker) {
  // the query below will return all the information for who user one is and who user two is.

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
  console.log(user_id, user_gender, user_preference);
  let getLikesQuery = `select * from pairs where user_one = ${ user_id } and user_one_heart =true or user_two = ${ user_id } and user_two_heart =true`;
  return db.query(getLikesQuery)
  .then((rows) => {
    //console.log(rows);
    let result = [];
    for (var i = 0; i < rows.length -1; i++) {
      result.push(rows[i].user_one);
      result.push(rows[i].user_two);
    }
    return _.without(result, parseInt(user_id)); // returns an array containing many instances of the target user_id
  })

  .then((liked) => {
    //console.log(liked);
    // get the analytics info of the hearted users, compile into the ideal
    let queryIds = ' user_id = ' + liked[0];
    liked.slice(1).forEach(function(item) {
      queryIds += ' OR user_id= ' + item;
    });

    let getLikedSetQuery = `select * from analytics where ` + queryIds + `;`;
    return db.query(getLikedSetQuery)
    .then((rows) => {
      console.log(rows);
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
    //console.log(buyCandidateQueryStr);
  return db.query(buyCandidateQueryStr)
    .then((row) => {
      if (row.length > 0) {
        return row[0].score;
      } else {
        return null;
      }
    });
}

