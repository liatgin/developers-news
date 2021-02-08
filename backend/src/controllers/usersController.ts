import pool from '../dbconfig/dbconnector';
import { v4 as uuid } from 'uuid';


class UsersController {

    //get a specific user
    public async getUser(req: any, res: any) {
      try {
        const client = await pool.connect();

        const sql = `
          SELECT * 
          FROM users
          WHERE usr_name=$1
        `
        const { rows } = await client.query(sql, [req.params.usrName]);
        console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%% user', rows, req.params.usrName)
        const user = rows;

        client.release();
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
        res.status(200).json(user);

    } catch (error) {
        res.status(400).send(error);
    }
    }
    
    // add new user
    public async newUser(req: any, res: any) {
      try {
          const client = await pool.connect();

          const sql = `
            INSERT INTO posts(id, password, nickname, about, creation_time, favorites) 
            VALUES ($1, $2, $3, $4, $5, $6)
          `
          const { rows } = await client.query(sql, [ uuid(), req.userName, req.password, '', new Date(), [] ]);
          const newUser = rows;

          client.release();
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
          res.status(200).json(newUser);

      } catch (error) {
          res.status(400).send(error);
      }
    }

    // add new favorite post to specific user
    public async newFavoritePost(req: any, res: any) {
      try {
          const client = await pool.connect();

          const sql = `
            UPDATE users
            SET favorites = array_append(favorites, $1)
            WHERE id =$2
          `
          const { rows } = await client.query(sql, [req.newFavorite, req.id]);
          const newFavorite = rows;

          client.release();
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
          res.status(200).json(newFavorite);
          
      } catch (error) {
          res.status(400).send(error);
      }
    }

    // get favorites of specific user
    public async userFavorites(req: any, res: any) {
      try {
          const client = await pool.connect();
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ in favorites')
            const favoritesPosts = `
              SELECT *
              FROM posts 
              INNER JOIN (select fav_users.*
                          from (SELECT usr_id, UNNEST(favorites) as favorite FROM users) fav_users
                          where usr_id=$1 AND favorite IS NOT NULL) as foo
              ON (posts.post_id=favorite);
            `

          const { rows } = await client.query(favoritesPosts, [req.params.usrId])
          console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ fav posts', rows)
          const favoritePosts = rows

          client.release();
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");

          res.status(200).json(favoritePosts);
      } catch (error) {
          res.status(400).send(error);
      }
    }

    // get submissions of specific user
    public async userSubmissions(req: any, res: any) {
      try {
          const client = await pool.connect();

          const sql = `
            SELECT * 
            FROM posts
            WHERE owner_id=$1
          `
          const { rows } = await client.query(sql, [req.params.usrId]);
          console.log('inside submissions******************************', 'req.params.usrId', req.params.usrId, rows)
          const submissions = rows;

          client.release();
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
          res.status(200).json(submissions);

      } catch (error) {
          res.status(400).send(error);
      }
    }
  }
  
  export = new UsersController();