import express, { Request, Response, Router } from 'express';
import path from 'path';
import { ControllerBase } from '../domain/interface/controller-base';
import { ItemService } from '../service/item.service';

export class ItemController implements ControllerBase {
  path: string = '/item';
  router: Router = Router();
  itemService = new ItemService();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path, this.index());
    this.router.use(`${this.path}/upload`, this.uploadItem());
  }

  public index() {
    return async (request: Request, response: Response) => {
      return await this.itemService.index(response);
    };
  }

  public uploadItem() {
    return express.static(
      path.resolve(__dirname, '..', '..', 'assets', 'upload'),
    );
  }
}
