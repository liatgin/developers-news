import { NextFunction, Request, Response, Router } from 'express';
import AuthenticationController from '../../controllers/authenticationController';
import passport from 'passport';

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
    this._router.get('/signup', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(this._controller.signUp);
    });

    this._router.get('/login', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(this._controller.login);
    });

    this._router.post('/logout', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(this._controller.logout);
    });

    this._router.get('/userAccount', (req: Request, res: Response, next: NextFunction) => {
        res.status(200).json(this._controller.userAccount);
    });
  }
}

passport.serializeUser((user: Express.User, done) => {
	done(null, user);
});

passport.deserializeUser((user: Express.User, done) => {
	done(null, user);
});

export = new AuthRouter().router;