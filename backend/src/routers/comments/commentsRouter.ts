import { NextFunction, Request, Response, Router } from 'express';
import CommnetsController from '../../controllers/commentsController';

class PostsRouter {
  private _router = Router();
  private _controller = CommnetsController;

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
    this._router.get('/userComments/:userId', (req: Request, res: Response, next: NextFunction) => {
      this._controller.userComments(req, res)
    });
    
    this._router.get('/postComments/:userId', (req: Request, res: Response, next: NextFunction) => {
      this._controller.postComments(req, res)
    });

    this._router.post('/:postId', (req: Request, res: Response, next: NextFunction) => {
      this._controller.addComment(req, res)
    });
  }
}

export = new PostsRouter().router;