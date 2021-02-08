import pool from '../dbconfig/dbconnector';
import { v4 as uuid } from 'uuid';


class PostsController {

    // get posts
    public async allPosts(req: any, res: any) {
        try {
            console.log('before sql')
            const client = await pool.connect();

            const sql = `
              SELECT * 
              FROM posts
            `
            const { rows } = await client.query(sql);
            const allPosts = rows;
            console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
            client.release();
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
            res.status(200).json(allPosts);

        } catch (error) {
          console.log('error is: ', error)
          res.status(400).send(error);
        }
    }

    // add new post
    public async addPost(req: any, res: any) {
      try {
          const client = await pool.connect();

          const sql = `
            INSERT INTO posts(post_id, link, time_written, owner_id, owner_name, title) 
            VALUES ($1, $2, $3, $4, $5, $6) 
          `
          const { rows } = await client.query(sql, [uuid(), req.url, new Date(), req.owner_id, req.owner_name, req.title]);
          const newPost = rows;

          client.release();
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
          res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization");
          res.status(200).json(newPost);

      } catch (error) {
          res.status(400).send(error);
      }
    }
  }
  
  export = new PostsController();