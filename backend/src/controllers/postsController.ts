import pool from '../dbconfig/dbconnector';
import { v4 as uuid } from 'uuid';
const jwt = require('express-jwt');


class PostsController {
    // get posts
    public async allPosts(req: any, res: any) {
        try {
            let userName
            console.log('before sql', req.user)
            let userId = req?.user?.userID
            const client = await pool.connect();
            if (userId) {
              const userNameSql = `
                SELECT usr_name
                FROM users
                WHERE usr_id=$1
              `
              const { rows } = await client.query(userNameSql, [userId]);
              userName = rows[0].usr_name
              console.log('after query', userName, userName)
            }
            // TODO: limit number of posts
            const postsSql = `
              SELECT * 
              FROM posts
            `
            const { rows } = await client.query(postsSql);
            const allPosts = rows;
            client.release();
            res.status(200).json({allPosts, userName, userId});
        } catch (error) {
          console.log('error is: ', error)
          res.status(400).send(error);
        }
    }

    // add new post
    public async addPost(req: any, res: any) {
      try {
          const client = await pool.connect();
          const body = JSON.parse(Object.entries(req.body)[0][0])
          const sql = `
            INSERT INTO posts(post_id, link, time_written, owner_id, owner_name, title)
            VALUES ($1, $2, $3, $4, $5, $6) 
          `
          const { rows } = await client.query(sql, [uuid(), body.url, new Date(), body.owner_id, body.owner_name, body.title]);
          const newPost = rows;
          console.log('rowssss', rows)

          client.release();
          res.status(200).json(newPost);

      } catch (error) {
          res.status(400).send(error);
      }
    }
  }
  
  export = new PostsController();