var request = require('request');
var url = 'http://i.imgur.com/76tI0oc.jpg';
import { faceAnalytics } from '../db/dbHelpers';
var user_id = 1;

function analyzeFace() {
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
	    var faceAnalytics = {
	    	age: null,
	    	coloring: null,
	    	expression: null,
	    	faceShape: null
	    };

	    if (info.face[0]) {
		    faceAnalytics = {
		    	age: info.face[0].attribute.age.value,
		    	coloring: info.face[0].attribute.race.value,
		    	expression: info.face[0].attribute.smiling.value,
		    	faceShape: info.face[0].position.width / info.face[0].position.height
		    };	
	    }; 

	    console.log('info from face analysis request', faceAnalytics);
	    putAnalytics(user_id, faceAnalytics);

	  }
	}

	request(options, callback);
};


// analyzeFace();

// analytics
// 
// attribute.race.value
// attribute.smiling.value
// position.height / position.width