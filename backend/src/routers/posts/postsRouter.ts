import { NextFunction, Request, Response, Router } from 'express';
import PostsController from '../../controllers/postsController';

class PostsRouter {
  private _router = Router();
  private _controller = PostsController;

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
    this._router.get('/', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(this._controller.allPosts);
    });

    this._router.get('/:id/favorites', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(this._controller.userFavorites);
    });

    this._router.get('/:id/submissions', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(this._controller.userSubmissions);
    });

    this._router.post('/:id/', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(this._controller.addPost);
    });
  }
}

export = new PostsRouter().router;