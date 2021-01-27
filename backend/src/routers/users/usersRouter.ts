import { NextFunction, Request, Response, Router } from 'express';
import UsersController from '../../controllers/usersController';

class UsersRouter {
  private _router = Router();
  private _controller = UsersController;

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
    this._router.post('/newUser', (req: Request, res: Response, next: NextFunction) => {
      this._controller.newUser(req, res)
    });

    this._router.post('/newFavoritePost/:id', (req: Request, res: Response, next: NextFunction) => {
      this._controller.newFavoritePost(req, res)
    });
  }
}

export = new UsersRouter().router;