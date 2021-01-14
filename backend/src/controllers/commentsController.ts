import pool from '../dbconfig/dbconnector';

class CommnetsController {

    // get comments of a specific user
    public async userComments(req: any, res: any) {
        try {
            const client = await pool.connect();

            const sql = `
                SELECT * 
                FROM comments
                WHERE owner_id=?
            `

            const { rows } = await client.query(sql, [req.id]);
            const comments = rows;

            client.release();

            res.send(comments);
        } catch (error) {
            res.status(400).send(error);
        }
    }


    // get comments of a specific post
    public async postComments(req: any, res: any) {
      try {
          const client = await pool.connect();
          const sql = `
            SELECT * 
            FROM comments
            WHERE post_id=?
          `
          const { rows } = await client.query(sql, [req.id]);
          const comment = rows;

          client.release();

          res.send(comment);
      } catch (error) {
          res.status(400).send(error);
      }
    }

    // add a comment to post/comment
    public async addComment(req: any, res: any) {
      try {
          const client = await pool.connect();

          const sql = `
            INSERT INTO posts(id, link, points, time_written, owner_id, title) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
          `
          const { rows } = await client.query(sql, [req.id, req.post_id, req.owner_id, req.comment, req.post_title, req.time, req.comment_to, req.src_id]);
          const comment = rows;

          client.release();

          res.send(comment);
      } catch (error) {
          res.status(400).send(error);
      }
    }
  }
  
  export = new CommnetsController();