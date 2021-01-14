import server from './server';
import pool from './dbconfig/dbconnector';
import passport from 'passport';
import bcrypt from 'bcrypt';
import * as passportLocal from 'passport-local';


const LocalStrategy = passportLocal.Strategy;
const port = parseInt(process.env.PORT || '4000');

passport.use('local', new LocalStrategy({passReqToCallback : true}, (req, username, password, done) => {
	
	loginAttempt();
	async function loginAttempt() {
		
		const client = await pool.connect()
		try {
			await client.query('BEGIN')
			var currentAccountsData = await JSON.stringify(client.query('SELECT id, "firstName", "email", "password" FROM "users" WHERE "email"=$1', [username], (err, result) => {
				
				if(err) {
					return done(err)
				}	
				if(result.rows[0] == null){
					return done(null, false);
				}
				else{
					bcrypt.compare(password, result.rows[0].password, (err, check) => {
						if (err){
							console.log('Error while checking password');
							return done(err);
						}
						else if (check){
							return done(null, [{email: result.rows[0].email, firstName: result.rows[0].firstName}]);
						}
						else{
							return done(null, false);
						}
					});
				}
			}))
		}
		catch(e){throw (e);}
	};
}))


const starter = new server().start(port)
  .then(port => console.log(`Running on port ${port}`))
  .catch(error => {
    console.log(error)
  });

export default starter;