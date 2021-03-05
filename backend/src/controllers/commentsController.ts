import pool from '../dbconfig/dbconnector';
import { v4 as uuid } from 'uuid';

class CommnetsController {

    // get comments of a specific user
    public async userComments(req: any, res: any) {
        try {
            const client = await pool.connect();

            const sql = `
                SELECT * 
                FROM comments
                WHERE owner_id=$1
            `
            const { rows } = await client.query(sql, [req.params.userId]);
            const comments = rows;

            client.release();
            res.status(200).json(comments);

        } catch (error) {
            res.status(400).send(error);
        }
    }


    // get comments of a specific post
    public async postComments(req: any, res: any) {
      try {
        console.log('inside comment $$$$$$$$$$$$$$$$')
        const client = await pool.connect();
        const sql = `
          SELECT * 
          FROM comments
          WHERE post_id=$1
        `
        const { rows } = await client.query(sql, [req.params.userId]);
        const comments = rows;

        client.release();
        res.status(200).json(comments);

      } catch (error) {
          res.status(400).send(error);
      }
    }

    // add a comment to post/comment
    public async addComment(req: any, res: any) {
      try {
          const client = await pool.connect();
          const body = JSON.parse(Object.entries(req.body)[0][0])
          const sql = `
            INSERT INTO comments(comment_id, post_id, owner_id, owner_name, comment, post_title, time_of_creation, comment_to, src_comment_id)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
          `
          const { rows } = await client.query(sql, [uuid(), body.post_id, body.owner_id, body.owner_name, body.comment, body.post_title, new Date(), body.comment_to, body.src_comment_id ? body.src_id: null]);
          const comment = rows;

          client.release();
          res.status(200).json(comment);

      } catch (error) {
          res.status(400).send(error);
      }
    }
  }
  
  export = new CommnetsController();