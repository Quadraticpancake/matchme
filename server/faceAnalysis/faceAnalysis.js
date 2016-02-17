const request = require('request');
import db from '../../db/config.js';

export default function generateUserAnalytics(id, url) {
  // encodes url so that result of Faceboom call (query url) can be used
  const encodedURI = encodeURIComponent(url);
  // options for Face++ API
  const options = {
    url: `https://faceplusplus-faceplusplus.p.mashape.com/detection/detect?url=${encodedURI}`,
    headers: {
      'X-Mashape-Key': 'IJ3moiqJsymshUNl41Sq09a38nMjp1OIrd9jsnJw6JjvebyGo5',
      Accept: 'application/json'
    }
  };

  function callback(error, response, body) {
    if (!error && response.statusCode === 200) {
      const info = JSON.parse(body);
      // initialize blank analytics object (to remain blank if no face detected in profile picture)
      let faceAnalytics = {
        user_id: null,
        age: null,
        coloring: null,
        expression: null,
        faceShape: null
      };
      // populate analytics object
      if (info.face[0]) {
        faceAnalytics = {
          user_id: id,
          age: info.face[0].attribute.age.value,
          coloring: info.face[0].attribute.race.value,
          expression: info.face[0].attribute.smiling.value,
          faceShape: info.face[0].position.width / info.face[0].position.height
        };
        // insert analytics results into analytics table
        const insertAnalyticsQueryStr = `INSERT INTO analytics` +
        `(user_id, age, coloring, expression, faceShape)` +
        ` VALUES ('${faceAnalytics.user_id}','${faceAnalytics.age}'` +
        `,'${faceAnalytics.coloring}','${faceAnalytics.expression}',` +
        `'${faceAnalytics.faceShape}') returning *;`;
        return db.query(insertAnalyticsQueryStr);
      }
    }
  }
  return request(options, callback);
}
