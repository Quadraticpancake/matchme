import * from '../db/dbHelpers';
import path from 'path';

export default function (app, express) {
	// test route, use this to get data for redux
	app.get('/api/candidates', function(req, res) {
		getRandomUsers().then(function(rows) {
			res.json([rows[0], rows[1], rows[2]])
		})
	})

	app.post('/api/pairs', function(req, res) {
		getRandomUsers().then(function(rows) {
			res.json([rows[0], rows[1], rows[2]])
		})
	})

	// app.get('/target', function(req, res) {
	// 	getRandomUsers().then(function(rows) {
	// 		res.json(rows[0]);
	// 	})
	// });

	// app.get('/prospects', function(req, res) {
	// 	getRandomUsers().then(function(rows) {
	// 		res.json([rows[0], rows[1]]);
	// 	})
	// });

}