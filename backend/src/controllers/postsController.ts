import pool from '../dbconfig/dbconnector';

class PostsController {

    // get posts
    public async allPosts(req: any, res: any) {
        try {
            const client = await pool.connect();

            const sql = `
              SELECT * 
              FROM posts
            `
            const { rows } = await client.query(sql);
            const allPosts = rows;

            client.release();

            res.send(allPosts);
        } catch (error) {
            res.status(400).send(error);
        }
    }

    // get favorites of specific user
    public async userFavorites(req: any, res: any) {
      try {
          const client = await pool.connect();
            
            const favoritesPosts = `
              SELECT *
              FROM posts 
              JOIN (
                SELECT fav_users.*
                FROM (SELECT usr_id, UNNEST(favorites) as favorite FROM users) fav_users
                WHERE id=? AND favorite IS NOT NULL
              ) 
              ON (post_id=favorite);
            `

          const { rows } = await client.query(favoritesPosts, [req.userID])
          const favoritePosts = rows

          client.release();

          res.send(favoritePosts);
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
            WHERE owner_id=?
          `
          const { rows } = await client.query(sql, req.ownerID);
          const submissions = rows;

          client.release();

          res.send(submissions);
      } catch (error) {
          res.status(400).send(error);
      }
    }


    // add new post
    public async addPost(req: any, res: any) {
      try {
          const client = await pool.connect();

          const sql = `
            INSERT INTO posts(id, link, points, time_written, owner_id, title) 
            VALUES ($1, $2, $3, $4, $5, $6) 
          `
          const { rows } = await client.query(sql, [req.id, req.link, req.points, req.time_written, req.owner_id, req.title]);
          const newPost = rows;

          client.release();

          res.send(newPost);
      } catch (error) {
          res.status(400).send(error);
      }
    }
  
  }
  
  export = new PostsController();