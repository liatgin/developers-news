import pool from '../dbconfig/dbconnector';
import { v4 as uuid } from 'uuid';
import {Request} from 'express';
// import jwt from 'express-jwt';
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');

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
              res.status(200).json(newUser);
          }
          else {
            res.status(400).json('error occured')
          }

          client.release();

          
      } catch (error) {
          res.status(400).send(error);
      }
    }

    // login into a specific account
    public async login(req: Request, res: any) {
      console.log('here 3')
      
      try {
        const client = await pool.connect();
        const body = JSON.parse(Object.entries(req.body)[0][0])
        console.log('Body:',body, body.username, body.password)
        const userQuery = `SELECT password, usr_id
                           FROM users
                           WHERE usr_name=$1`
        const { rows } = await client.query(userQuery, [body.username]);
        const user: any = rows[0]
        console.log('Found user in DB:', user )
        // console.log('user', user, body.password, user[0].password.trim(), body.password != user[0].password.trim() )
        if(!user.usr_id || body.password != user.password.trim()) {
          console.log('error occured')
          return res.sendStatus(401)
        }   
        const token = jwt.sign({userID: user.usr_id}, 'app-super-shared-secret', {expiresIn: '2d'});
        console.log('Dict in token:', {userID: user.usr_id})
        res.send({token});

      } catch (error) {
          console.error(error)
          res.status(400).send(error);
      }
    }

    // fetch user details
    // public async userAccount(req: any, res: any) {
    //     try {
    //       const client = await pool.connect();

    //       if (req.isAuthenticated()) {
    //         const userDetailsSQL = `
    //             SELECT *
    //             FROM users
    //             WHERE usrName = ?1
    //         `

    //       const { rows } = await client.query(userDetailsSQL, [req.body.usrName]);
    //       const userDetails = rows;
  
    //       client.release();
    //       res.header("Access-Control-Allow-Origin", "*");
    //       res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    //       res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
    //       res.send(userDetails);

    //       }
  
    //     } catch (error) {
    //         res.status(400).send(error);
    //     }
    //   } 
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