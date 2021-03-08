import dotenv from 'dotenv';
import express from 'express';
import MasterRouter from './routers/MasterRouter';


// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
class Server {
  public app = express();
  public router = MasterRouter;
}

// initialize server app
const server = new Server();

// make server app handle any route starting with '/api'
server.app.use('/api', server.router);

  
// make server listen on some port
((port = process.env.APP_PORT || 5000) => {
server.app.listen(port, () => console.log(`> Listening on port ${port}`));
})();