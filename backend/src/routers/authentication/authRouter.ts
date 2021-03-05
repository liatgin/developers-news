import { NextFunction, Request, Response, Router } from 'express';
import AuthenticationController from '../../controllers/authenticationController';
import passport from 'passport';
import commentsController from '../../controllers/commentsController';

class AuthRouter {
  private _router = Router();
  private _controller = AuthenticationController;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching controller endpoints.
   */
  private _configure() {
    console.log('here 1')
    this._router.get('/signup', (req: Request, res: Response, next: NextFunction) => {
      this._controller.signUp(req, res);
    });
    
    this._router.post('/login', (req: Request, res: Response, next: NextFunction) => {
      console.log(`here 2 ${req.method}`)
     this._controller.login(req, res);
    });

    this._router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
      this._controller.logout(req, res);
    });

    // this._router.get('/userAccount', (req: Request, res: Response, next: NextFunction) => {
    //     res.status(200).json(this._controller.userAccount);
    // });
  }
}

// passport.serializeUser((user: Express.User, done) => {
// 	done(null, user);
// });

// passport.deserializeUser((user: Express.User, done) => {
// 	done(null, user);
// });

export = new AuthRouter().router;