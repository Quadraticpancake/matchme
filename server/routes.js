import {getRandomUsers} from '../db/dbHelpers';

module.exports = function (app, express) {
	app.get('/test', function(req, res) {
		getRandomUsers().then(function(rows) {
			res.json(rows);
		})
	});
}