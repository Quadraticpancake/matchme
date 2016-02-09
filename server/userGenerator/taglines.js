var fs = require('fs');
var path = require('path');
var random_name = require('node-random-name');
var zipcodes = require('zipcodes');
var descriptions = require('./descriptions.js');
var possibleZipcodes = zipcodes.radius(94114, 60); // SF to San Jose seemed reasonable

// bing image search type:photograph people:just faces search:guy

var femalePath = path.join(__dirname, '..', '..', 'static', 'img', 'profilePics', 'female');
var malePath = path.join(__dirname, '..', '..', 'static', 'img', 'profilePics', 'male');
var femaleImages = fs.readdirSync(femalePath);
var maleImages = fs.readdirSync(malePath);

export default function generateUser() {

  var gender = function() {
    if (Math.floor(Math.random() * 2) === 0) {
      return 'male';
    }
    return 'female';
  };

  var genderPreference = function(input) {
    // set to be 10% gay and 10% bisexual for diversity in testing
    let random = Math.floor(Math.random() * 10);
    if (random === 0) {
      return input;
    } else if (random === 1) {
      return 'both';
    }
    if (input === 'male') return 'female';
    return 'male';
  }

  var zipcode = function() {
    return possibleZipcodes[Math.floor(Math.random()*possibleZipcodes.length)];
  }

  var profilePic = function(gender) {
    var base = "/img/profilePics/";
    var filename = "";
    if (gender === 'male') {
      filename = maleImages[Math.floor(Math.random()*maleImages.length)];
    } else {
      filename = femaleImages[Math.floor(Math.random()*femaleImages.length)];
    }
    return String(base + gender + "/" + filename);
  };

  var start = new Date(1980, 0, 1); // selecting between age 21 and 42
  var end = new Date(1997, 0, 1);

  // Birthday needs to be in YYYY-MM-DD format for SQL
  // getMonth() returns 0 for Jan, 1 for Feb, etc, so need to increment it by 1
  var newDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())); 
  var birthdayStr = newDate.getFullYear() + '-' + function(){ return newDate.getMonth() + 1; }() + '-' + newDate.getDate();
  var birthday = newDate;

  var calculateAge = function(birthdate) { 
    var difference = Date.now() - birthdate;
    var ageDate = new Date(difference); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  var age = calculateAge(birthday);
  //console.log('AGE', age)
  var minAge = Math.ceil(age/2 + 7); // eh, seems fair
  var maxAge = (age-7)*2;

  var gender = gender();

  var fakeUser = {
    facebook_id: 12345,
    first_name: random_name({ first: true, gender: gender, seed: String(Math.random() * Date.now()) }),
    last_name: random_name({ last: true, seed: String(Math.random() * Date.now()) }),
    gender: gender,
    birthday: birthday, // TODO
    birthdayStr: birthdayStr, // Use birthdayStr if you want to insert into the DB
    zipcode: zipcode(), // TODO
    status: true, // this can just be a boolean, whether they can be matched
    age_min: minAge, // birthday minus random number between 2 and 5 (floor 21)
    age_max: maxAge, // birthday plus random number between 2 and 10 (floor 21)
    gender_preference: genderPreference(gender), // homosexual ~10% of the time
    location_preference: 5, // just default to 5 mile radius, zipcodes.radius(zipcode, 5) returns a list of all zipcodes in radius
    description: descriptions[Math.floor(Math.random()*descriptions.length)], // this field doesn't insert correctly into DB due to escape chars
    image_url: profilePic(gender) 
  }

  return fakeUser;

}
