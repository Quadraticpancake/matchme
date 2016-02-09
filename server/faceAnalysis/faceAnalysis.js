'use strict';

var request = require('request');
import db from '../../db/config.js';

export default function generateUserAnalytics(id, url) {

	let encodedURI = encodeURIComponent(url);

	var options = {
	  url: 'https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?url=' + encodedURI,
	  headers: {
	    "X-Mashape-Key": "IJ3moiqJsymshUNl41Sq09a38nMjp1OIrd9jsnJw6JjvebyGo5",
	    "Accept": "application/json"
	  }
	};

	function callback(error, response, body) {
	  if (!error && response.statusCode == 200) {
	  	// console.log(body);
	  	// console.log(error);
	    var info = JSON.parse(body);
	    var faceAnalytics = {
	    	user_id: null,
	    	age: null,
	    	coloring: null,
	    	expression: null,
	    	faceShape: null
	    };

	    if (info.face[0]) {
		    faceAnalytics = {
		    	user_id: id,
		    	age: info.face[0].attribute.age.value,
		    	coloring: info.face[0].attribute.race.value,
		    	expression: info.face[0].attribute.smiling.value,
		    	faceShape: info.face[0].position.width / info.face[0].position.height
		    };	
	    }; 

	    var insertAnalyticsQueryStr = `INSERT INTO analytics (user_id, age, coloring, expression, faceShape) VALUES ('${faceAnalytics.user_id}','${faceAnalytics.age}','${faceAnalytics.coloring}','${faceAnalytics.expression}','${faceAnalytics.faceShape}') returning *;`;
	  	return db.query(insertAnalyticsQueryStr);
	  }
	}


	return request(options, callback);
};

// generateUserAnalytics(1, "https://scontent.fsnc1-1.fna.fbcdn.net/hphotos-xfa1/v/t1.0-9/12376423_10205626501086765_5111400853167845939_n.jpg?oh=b653caef995bb365c0bba94a54612d85&oe=576ADD93");


