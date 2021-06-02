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

    this._router.get('/getUser/:usrName/', (req: Request, res: Response, next: NextFunction) => {
      this._controller.getUser(req, res)
    });

    this._router.post('/newUser', (req: Request, res: Response, next: NextFunction) => {
      this._controller.newUser(req, res)
    });

    this._router.put('/newFavoritePost/:usrId/:favoritePostId', (req: Request, res: Response, next: NextFunction) => {
      this._controller.newFavoritePost(req, res)
    });

    this._router.put('/update/:usrId', (req: Request, res: Response, next: NextFunction) => {
      this._controller.updateUserDetails(req, res)
    });

    this._router.get('/userFavorites/:usrId', (req: Request, res: Response, next: NextFunction) => {
      this._controller.userFavorites(req, res)
    });

    this._router.get('/submissions/:usrId', (req: Request, res: Response, next: NextFunction) => {
      this._controller.userSubmissions(req, res)
    });
  }
}

export = new UsersRouter().router;