import pool from '../dbconfig/dbconnector';

class UsersController {
    
    // add new user
    public async newUser(req: any, res: any) {
      try {
          const client = await pool.connect();

          const sql = `
            INSERT INTO posts(id, nickname, about, creation_time, favorites) 
            VALUES ($1, $2, $3, $4, $5)
          `
          const { rows } = await client.query(sql, [req.id, req.nickname, req.about, req.creation_time, req.favorites]);
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
            SET favorites = array_append(favorites, ?1)
            WHERE id = ?2
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
  }
  
  export = new UsersController();