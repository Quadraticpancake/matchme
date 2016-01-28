/* NOTE:
	THESE TESTS CAN'T BE RUN AT THE SAME TIME AS THE DBHELPERS TESTS, YOU HAVE TO COMMENT OUT THE DBHELPERS TESTS TO RUN THIS ONE
*/

// require('./dbHelpers')
// import {expect} from 'chai'
// import makeStore from '../server/scoreboard/store'
// import request from 'request'
// import app from '../server/server'

// let store = {}

// describe('scoreboard', () => {
// 	describe('store', () => {
// 		beforeEach((done) => {
// 			store = makeStore()
// 			done()
// 		})

// 		it('should be a store', () => {
// 			expect(store.dispatch).to.be.a('function')
// 		})
// 		it('should update scoreboard after getting a new match', () => {
// 			store.dispatch({type: 'UPDATE_LATEST', latestMatch: {target: 1, prospect: 2}})
// 			expect(store.getState().length).to.equal(1)
// 		})
// 		it('should keep scoreboard at 5 matches', () => {
// 			store.dispatch({type: 'UPDATE_LATEST', latestMatch: {target: 1, prospect: 2}})
// 			store.dispatch({type: 'UPDATE_LATEST', latestMatch: {target: 1, prospect: 2}})
// 			store.dispatch({type: 'UPDATE_LATEST', latestMatch: {target: 1, prospect: 2}})
// 			store.dispatch({type: 'UPDATE_LATEST', latestMatch: {target: 1, prospect: 2}})
// 			store.dispatch({type: 'UPDATE_LATEST', latestMatch: {target: 1, prospect: 2}})
// 			store.dispatch({type: 'UPDATE_LATEST', latestMatch: {target: 1, prospect: 2}})
// 			store.dispatch({type: 'UPDATE_LATEST', latestMatch: {target: 1, prospect: 2}})
// 			store.dispatch({type: 'UPDATE_LATEST', latestMatch: {target: 1, prospect: 2}})
// 			expect(store.getState().length).to.equal(5)
// 		})

// 		it('should update scoreboard when a pair is inserted into the db', () => {
// 			app.listen('3000')
// 			request.post({
// 			  headers: {'content-type': 'application/json'},
// 			  url:     'http://localhost:3000/api/pairs',
// 			  body:    JSON.stringify({target: {user_id: 10}, prospect: {user_id: 20}})
// 			})

// 			//wait for post request to finish before running test... for some reason I can't just put it in the request.post callback
// 			setTimeout(() => {
// 		  	expect(store.getState()[0].target.user_id).to.equal(10)
// 		  	expect(store.getState()[0].prospect.user_id).to.equal(20)
// 			}, 500)

// 		})
// 	})
// })