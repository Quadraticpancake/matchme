import {getRandomUsers} from '../db/dbHelpers';

module.exports = function (app, express) {
	// test route, use this to get data for redux
	app.get('/test', function(req, res) {
		getRandomUsers().then(function(rows) {
			res.json(rows);
		})
	});
}