import {expect} from 'chai';
import db from '../db/config';
import createTables from  '../db/schemas';
import generateUser from '../server/userGenerator/taglines';
import generateFakeAnalytics from '../server/faceAnalysis/fakeAnalysis';
import { addMatch, getMatchSet, getMatchesMade } from '../db/dbHelpers';


describe('database helpers', () => {
	describe('database intialization', () => {
		before((done) => {
			// this is done to return database to untouched state: http://stackoverflow.com/questions/3327312/drop-all-tables-in-postgresql
			db.query('DROP SCHEMA IF EXISTS public CASCADE;')
      		.then(() => {
				return db.query('CREATE SCHEMA public;');
			})
			.then(() => {
				return db.query('GRANT ALL ON SCHEMA public TO postgres;');
			})
			.then(() => {
				return db.query('GRANT ALL ON SCHEMA public TO public;');
			})
			.then(() => {
				return db.query("COMMENT ON SCHEMA public IS 'standard public schema'");
			})
			.then(() => {
				return createTables();
			})
			.then((result) => {
				console.log(result, result)
				const NUM_PROFILES = 100;
				let profilesGenerated = 0;
				for (var i = 0; i < NUM_PROFILES; i++) {

					var fakeUser = generateUser();
					var insertUserQueryStr = `INSERT INTO users(facebook_id,first_name,last_name,gender,birthday,zipcode,status,age_min,age_max,gender_preference,\
							location_preference,description,image_url,score,real) VALUES ('${i}','${fakeUser.first_name}','${fakeUser.last_name}','${fakeUser.gender}',\
							'${fakeUser.birthdayStr}','${fakeUser.zipcode}','${fakeUser.status}',${fakeUser.age_min},${fakeUser.age_max},\
							'${fakeUser.gender_preference}',${fakeUser.location_preference},'${fakeUser.description}','${fakeUser.image_url}',0,true) RETURNING user_id;`;

					// run done() after the last user is generated to end the before block, otherwise run the query without resolving the promise

					db.query(insertUserQueryStr)
					.then((row) =>{
						profilesGenerated += 1;
						let user_id = row[0].user_id;
						var fakeAnalytics = generateFakeAnalytics(user_id);
						var insertUserAnalyticsQueryStr = `INSERT INTO analytics (user_id, age, coloring, expression, faceShape) VALUES (${fakeAnalytics.user_id},${fakeAnalytics.age},'${fakeAnalytics.coloring}', ${fakeAnalytics.expression} , ${fakeAnalytics.faceShape});`;
						return db.query(insertUserAnalyticsQueryStr);
					}).then(() => {
						if (profilesGenerated === NUM_PROFILES-1) {
							done();
						}
				  	});
				}

				console.log('tables dropped and recreated; fake users generated');
			})
			.catch((error) => {
				throw new Error(error);
			});
		});
        it('should exist', () => {
        	return db.query('')
        	.then((rows) => {
        	  consol.log('rows');
        	  expect(rows.length).to.exist;
        	});
        });
	});

	describe('addMatch', () => {
		it('should update a pair if it already exists', () => {
			return db.query('insert into pairs (user_one, user_two, connected,user_one_heart,user_two_heart) values (5,20,false,false,false);')
			.then((rows) => {
				return addMatch({matchmaker: {user_id: 6}, pair: {target: {user_id: 5}, prospect: {user_id: 20} }})
			})
			.then(() => {
				return db.query('select * from pairs where pairs.user_one = 5 and pairs.user_two = 20;')
			})
			.then((rows) => {
				expect(rows.length).to.equal(1)
			})
			.catch((err) => {
				throw new Error(err)
			})
		})
		it('should create a pair if it does not exist', () => {
			return addMatch({matchmaker: {user_id: 4}, pair: {target: {user_id: 6}, prospect: {user_id: 25} }})
			.then(() => {
				return db.query('select * from pairs where pairs.user_one = 6 and pairs.user_two = 25;')
			})
			.then((rows) => {
				expect(rows.length).to.equal(1)
				expect(rows[0].user_one).to.equal(6)
				expect(rows[0].user_two).to.equal(25)
			})
		})
		it('should create a match entry with the correct pair id and matchmaker', () => {
            return addMatch({matchmaker: {user_id: 5}, pair: {target: {user_id: 6}, prospect: {user_id: 25} }})
			.then(() => {
				return db.query('select * from matches_made where matchmaker = 5')
			})
			.then((rows) => {
				expect(rows.length).to.equal(1)
				expect(rows[0].matchmaker).to.equal(5)
				expect(rows[0].pair).to.equal(2) // Based on above tests
			})
		})
		it('should handle going over the threshold correctly', () => {
			return addMatch({matchmaker: {user_id: 8}, pair: {target: {user_id: 5}, prospect: {user_id: 20} }})
			.then((pairRow) => {
				console.log(pairRow);
				return db.query('select * from users where user_id = 6 or user_id = 8')
				.then((rows) => {
					expect(pairRow.length).to.equal(1)
					expect(pairRow[0].pair_id).to.equal(1)
					expect(pairRow[0].user_one).to.equal(5)
					expect(pairRow[0].user_two).to.equal(20)
					expect(rows.length).to.equal(2)
                    // Assumes that the threshold is set to 1 (2 match requirement)
					if (rows[0].user_id === 8) {
					  expect(rows[0].score).to.equal(210)
					  expect(rows[1].score).to.equal(110)
					} else {
					  expect(rows[0].score).to.equal(210)
					  expect(rows[1].score).to.equal(110)
				    }
				})
			})
		})
	});

	// describe('getMatchSet', () => {
	// 	it('should get a match set', () => {
	// 		return getMatchSet()
	// 		.then((rows) => {

	// 			expect(rows.target).to.have.property('first_name')
	// 			expect(rows.target).to.have.property('gender_preference')

	// 			expect(rows.prospects).to.have.length(2)
	// 			expect(rows.prospects[0]).to.not.equal(rows[1])
	// 			expect(rows.prospects[0]).to.have.property('first_name')
	// 			expect(rows.prospects[1]).to.have.property('gender_preference')
	// 		})
	// 		.catch((err) => {
	// 			throw new Error(err);
	// 		});
	// 	});
	// });

	describe('getMatchesMade', () => {
		it('should get a pair that connected in part due to the matchmaker made', () => {
			return getMatchesMade(4)
			.then((output) => {
			  expect(output.pairs[0].user_one.user_id).to.equal(6);
			});
		});
		it('should return score for matchmaker', () => {
			return getMatchesMade(4)
			.then((output) => {
			  expect(output.score).to.equal(110);
			});
		});

	});

    /*
	descripe('getMatchesMade', () => {
		it('should get two distinct users and their props', () => {

			return getMatchesMade(3)
		})
	})
	*/
});