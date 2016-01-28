import { getRandomUsers, addMatch, getMatchSet } from '../db/dbHelpers';
import path from 'path';
import bodyParser from 'body-parser'

export default function (app, express) {
	// test route, use this to get data for redux
	app.get('/api/candidates', function(req, res) {
		getRandomUsers().then(function(rows) {
			res.json([rows[0], rows[1], rows[2]])
		})
	})

	app.post('/api/pairs', (req, res) => {
		addMatch(req.body).then(() => {
			getRandomUsers().then((rows) => {
				res.json([rows[0], rows[1], rows[2]])
			})
		})	
	})

	app.get('/api/matchSet', (req, res) => {
		getMatchSet().then((matchSet) => {

			console.log(matchSet)
			res.json(matchSet)
		})
	})


}