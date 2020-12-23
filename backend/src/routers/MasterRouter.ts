import { Router } from 'express';
import PostsRouter from './posts/postsRouter';
import UsersRouter from './users/usersRouter';

class MasterRouter {
  private _router = Router();
  private _subrouterA = PostsRouter;
  private _subrouterB = UsersRouter;

  get router() {
    return this._router;
  }

  constructor() {
    this._configure();
  }

  /**
   * Connect routes to their matching routers.
   */
  private _configure() {
    this._router.use('/posts', this._subrouterA);
    this._router.use('/users', this._subrouterB);
  }
}

export = new MasterRouter().router;