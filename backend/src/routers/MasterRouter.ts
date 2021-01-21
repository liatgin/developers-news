import { Router } from 'express';
import PostsRouter from './posts/postsRouter';
import UsersRouter from './users/usersRouter';
import CommentsRouter from './comments/commentsRouter';
import AuthRouter from './authentication/authRouter';

class MasterRouter {
  private _router = Router();
  private postsRouter = PostsRouter;
  private usersRouter = UsersRouter;
  private commentsRouter = CommentsRouter;
  private authRouter = AuthRouter;

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
    this._router.use('/authentication', this.authRouter)
    console.log('inside master router')
    this._router.use('/posts', this.postsRouter);
    this._router.use('/users', this.usersRouter);
    this._router.use('/comments', this.commentsRouter);
  }
}

export = new MasterRouter().router;