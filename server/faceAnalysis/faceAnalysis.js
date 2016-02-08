var request = require('request');
var url = 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Michelle-Borromeo-Actor-Headshots-Vancouver-BC20110408_0030.jpg';

var options = {
  url: 'https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?url=' + url,
  headers: {
    "X-Mashape-Key": "IJ3moiqJsymshUNl41Sq09a38nMjp1OIrd9jsnJw6JjvebyGo5",
    "Accept": "application/json"
  }
};

function callback(error, response, body) {
  if (!error && response.statusCode == 200) {
    var info = JSON.parse(body);
    console.log('info from face analysis request', info.face[0]);
  }
}

request(options, callback);

// analytics
// attribute.age.value
// attribute.race.value
// attribute.smiling.value
// position.height
// position.width

// compare:
// | age diff |
// | smiling diff |
// | height/width diff |
// race same = 0, not same = some number

