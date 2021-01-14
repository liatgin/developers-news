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
    this._router.get('/:id/userComments', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(this._controller.userComments);
    });

    this._router.get('/:id/postComments', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(this._controller.postComments);
    });

    this._router.post(':id/addComment', (req: Request, res: Response, next: NextFunction) => {
      res.status(200).json(this._controller.addComment);
    });
  }
}

export = new PostsRouter().router;