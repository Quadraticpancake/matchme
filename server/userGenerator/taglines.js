const fs = require('fs');
const path = require('path');
const randomName = require('node-random-name');
const zipcodes = require('zipcodes');
const descriptions = require('./descriptions.js');
const possibleZipcodes = zipcodes.radius(94114, 60); // SF to San Jose seemed reasonable

// bing image search type:photograph people:just faces search:guy

const femalePath = path.join(__dirname, '..', '..', 'static', 'img', 'profilePics', 'female');
const malePath = path.join(__dirname, '..', '..', 'static', 'img', 'profilePics', 'male');
const femaleImages = fs.readdirSync(femalePath);
const maleImages = fs.readdirSync(malePath);

export default function generateUser() {
  const gender = () => {
    if (Math.floor(Math.random() * 2) === 0) {
      return 'male';
    }
    return 'female';
  };

  const genderPreference = (input) => {
    // set to be 10% gay and 10% bisexual for diversity in testing
    const random = Math.floor(Math.random() * 10);
    if (random === 0) {
      return input;
    } else if (random === 1) {
      return 'both';
    }
    if (input === 'male') return 'female';
    return 'male';
  };

  const zipcode = () => {
    return possibleZipcodes[Math.floor(Math.random() * possibleZipcodes.length)];
  };

  const profilePic = (gender) => {
    const base = '/img/profilePics/';
    let filename = '';
    if (gender === 'male') {
      filename = maleImages[Math.floor(Math.random() * maleImages.length)];
    } else {
      filename = femaleImages[Math.floor(Math.random() * femaleImages.length)];
    }
    return String(`${base}${gender}/${filename}`);
  };

  const start = new Date(1980, 0, 1); // selecting between age 21 and 42
  const end = new Date(1997, 0, 1);

  // Birthday needs to be in YYYY-MM-DD format for SQL
  // getMonth() returns 0 for Jan, 1 for Feb, etc, so need to increment it by 1
  const newDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())); 
  const birthdayStr = newDate.getFullYear() + '-' + function(){ return newDate.getMonth() + 1; }() + '-' + newDate.getDate();
  const birthday = newDate;

  const calculateAge = (birthdate) => {
    const difference = Date.now() - birthdate;
    const ageDate = new Date(difference); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const age = calculateAge(birthday);
  const minAge = Math.ceil(age / 2 + 7);
  const maxAge = (age - 7) * 2;

  const genderDef = gender();

  const fakeUser = {
    facebook_id: 12345,
    first_name: randomName({ first: true, gender,
      seed: String(Math.random() * Date.now()) }),
    last_name: randomName({ last: true, seed: String(Math.random() * Date.now()) }),
    gender: genderDef,
    birthday,
    birthdayStr, // Use birthdayStr if you want to insert into the DB
    zipcode: zipcode(), // TODO
    status: true, // this can just be a boolean, whether they can be matched
    age_min: minAge, // birthday minus random number between 2 and 5 (floor 21)
    age_max: maxAge, // birthday plus random number between 2 and 10 (floor 21)
    gender_preference: genderPreference(genderDef), // homosexual ~10% of the time
    location_preference: 5, // just default to 5 mile radius
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    image_url: profilePic(gender)
  };
  return fakeUser;
}
