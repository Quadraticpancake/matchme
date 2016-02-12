import db from './config';
// this is a copy of the addMatch function from dbHelpers.js, the difference is that more points are awarded to the people who
// made the match by playing the multiplayer game than if you just clicked through normally

export function addMatchWithBonus (match) {
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
  var matchQuery = `with score as (update users set score = score + 30 where user_id = \
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

var userCount = null;

export function getMatchSetMP (user_id) {


  var func = function (user_id) {

        var randomUserIdsStr = '' + user_id;
        for (var i = 0; i < 10; i++) {
          randomUserIdsStr += ', ' + (Math.floor(Math.random() * userCount) + 1); 
        }
        var sample_min = Math.floor(Math.random() * userCount) + 1;
        var prospectRangeStr = ' user_id >= ' + sample_min + ' or user_id <= ';
        if (sample_min + 200 <= userCount) {
          prospectRangeStr += (sample_min + 200);
        } else {
          prospectRangeStr += (sample_min - userCount + 200);
        }       
        var date = new Date();
        var month = date.getMonth();
        var day = date.getDate()
        month = month.length < 2 ? '0' + month : month;
        day = day.length < 2 ? '0' + day : day;
        var dateStr = '' + month + '/' + day + '/' + date.getFullYear();
        var targetsAndUserQuery = `select * from users where user_id in ( ${randomUserIdsStr} );`
        var prospectsQuery = `select * from users where ${ prospectRangeStr };`;
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

        var match = function (p1, p2) {
          console.log()
          return (p1.gender === p2.gender_preference || p2.gender_preference === 'both') 
            && (p2.gender === p1.gender_preference || p1.gender_preference === 'both') 
            && p1.user_id !== p2.user_id && age(p2) !== false && age(p1) !== false 
            && p1.age_min <= age(p2) && p2.age_min <= age(p1) && p2.age_max >= age(p1) && p1.age_max >= age(p2);
        }

        return db.query(targetsAndUserQuery)
          .then((targetRows) => {
            return db.query(prospectsQuery)
              .then((prospectRows) => {
                var score = null;
                var triads = [];
                var target;
                var prospects = [];

                for (var i = 0; i < targetRows.length; i++) {
                  if (targetRows[i].user_id === user_id) {
                    score = targetRows[i].score;
                  } else {
                    target = targetRows[i];
                    for (var j = 0; (j < prospectRows.length && prospects.length < 2); j++) {
                      //console.log(prospectRows[j], prospectRows[j].user_id !== user_id, match(target, prospectRows[j]));
                      if (prospectRows[j] && prospectRows[j].user_id !== user_id && match(target, prospectRows[j])) {
                        prospects.push(prospectRows[j]);
                        prospectRows[j] = null;
                      }
                    }
                    if (prospects.length === 2) {
                      triads.push({target: target, prospects: prospects})
                      prospects = [];
                    }
                  }
                }
                return {score: score, triads: triads};
              })
          })
  };
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
