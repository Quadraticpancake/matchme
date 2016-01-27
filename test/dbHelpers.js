import {expect} from 'chai';
import db from '../db/config';
import createTables from  '../db/schemas';
import generateUser from '../server/userGenerator/taglines';
import { getRandomUsers, addPair } from '../db/dbHelpers';

describe('database helpers', () => {
	describe('getRandomUsers', () => {
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
			.then(() => {
				for (var i = 0; i < 50; i++) {
					var fakeUser = generateUser();
					var insertUserQueryStr = `INSERT INTO users(facebook_id,first_name,last_name,gender,birthday,zipcode,status,age_min,age_max,gender_preference,\
							location_preference,description) VALUES ('12345','${fakeUser.first_name}','${fakeUser.last_name}','${fakeUser.gender}',\
							'${fakeUser.birthdayStr}','${fakeUser.zipcode}',${fakeUser.status},${fakeUser.age_min},${fakeUser.age_max},\
							'${fakeUser.gender_preference}',${fakeUser.location_preference},'Placeholder description');`;

				// run done() after the 50th user is generated to end the before block, otherwise run the query without resolving the promise
					if (i === 49) {
						db.query(insertUserQueryStr)
					  .then(() => {
					  	done();
					  });
					} else {
						db.query(insertUserQueryStr);
					}
				}
				
				console.log('tables dropped and recreated; fake users generated');
			})
			.catch((error) => {
				throw new Error(error);
			});
		});

		it('should return 3 random, different users', () => {
			return getRandomUsers()
			.then((rows) => {
				expect(rows.length).to.equal(3);
				expect(rows[0]).not.to.equal(rows[1]);
				expect(rows[1]).not.to.equal(rows[2]);
				expect(rows[0]).not.to.equal(rows[2]);
			})
			.catch((err) => {
				throw new Error(err);
			});
		});

	});

	describe('addPair', () => {
		it('should update a pair if it already exists', () => {
			return db.query('insert into pairs (user_one, user_two, times_matched, connected) values (5,20,1,false);')
			.then((rows) => {
				console.log('inserted test pair', rows)
				return addPair({ target: {user_id: 5}, prospect: {user_id: 20} })
			})
			.then(() => {
				return db.query('select * from pairs where pairs.user_one = 5 and pairs.user_two = 20;')
			})
			.then((rows) => {
				expect(rows.length).to.equal(1)
				expect(rows[0].times_matched).to.equal(2)
				console.log('rows from addPair', Array.isArray(rows), rows.length, rows)
			})
			.catch((err) => {
				throw new Error(err)
			})
		})
		it('should create a pair if it does not exist', () => {
			return addPair({ target: {user_id: 6}, prospect: {user_id: 25} })
			.then(() => {
				return db.query('select * from pairs where pairs.user_one = 6 and pairs.user_two = 25;')
			})
			.then((rows) => {
				expect(rows.length).to.equal(1)
				expect(rows[0].user_one).to.equal(6)
				expect(rows[0].user_two).to.equal(25)
			})
		})
	});
});