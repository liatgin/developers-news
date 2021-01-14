import pool from '../dbconfig/dbconnector';
import { v4 as uuid } from 'uuid';
import {Request} from 'express'

class AuthenticationController {

    constructor() {}
    
    // add new user account
    public async signUp(req: any, res: any) {
      try {
          const client = await pool.connect();

          const userIDSQL = `
            SELECT id 
            FROM users
            WHERE usrName"=$1;
          `
          const { rows } = await client.query(userIDSQL, [req.body.username]);
          if (!rows[0]) {
              const insertNewUserSQL = `
                INSERT INTO users (id, usr_name, password, about, time_of_creation, favorites) 
                VALUES ($1, $2, $3, $4, $5, $6)
              `
              const { rows } = await client.query(insertNewUserSQL, [uuid(), req.body.usr_name, req.body.password, req.body.about, Date.now(), req.body.favorites]);
              const newUser = rows
              res.send(newUser);
          }
          else {
              res.send('error occured')
          }

          client.release();

          
      } catch (error) {
          res.status(400).send(error);
      }
    }

    // login into a specific account
    public async login(req: Request, res: any) {
      try {
        if (req.isAuthenticated()) {
			res.redirect('/account');
		}

      } catch (error) {
          res.status(400).send(error);
      }
    }

    // fetch user details
    public async userAccount(req: any, res: any) {
        try {
          const client = await pool.connect();

          if (req.isAuthenticated()) {
            const userDetailsSQL = `
                SELECT *
                FROM users
                WHERE usrName = ?1
            `

          const { rows } = await client.query(userDetailsSQL, [req.body.usrName]);
          const userDetails = rows;
  
          client.release();
  
          res.send(userDetails);
          }
  
        } catch (error) {
            res.status(400).send(error);
        }
      } 
    // logout from user account
    public async logout(req: any, res: any) {
        try {
            console.log(req.isAuthenticated());
            req.logout();
            console.log(req.isAuthenticated());
            req.flash('success', "Logged out. See you soon!");
            res.redirect('/');
        } catch (error) {
            res.status(400).send(error);
        }
      }
  }
  
  export = new AuthenticationController();