import express, { Request, Response, Router } from 'express';
import path from 'path';
import { knexConnection } from '../database/config/knex.config';
import { ItemDTO } from '../domain/dto/item-dto';
import { ControllerBase } from '../domain/interface/controller-base';
import { Item } from '../domain/model/item';

export class ItemController implements ControllerBase {
  path: string = '/item';
  router: Router = Router();

  constructor() {
    this.initRoutes();
  }

  public initRoutes() {
    this.router.get(this.path, this.items());
    this.router.use(`${this.path}/upload`, this.uploadItem());
  }

  public items() {
    return async (request: Request, response: Response) => {
      const items = await knexConnection('item').select('*');
      return response.json(items.map((item: Item) => new ItemDTO({ ...item })));
    };
  }

  public uploadItem() {
    return express.static(
      path.resolve(__dirname, '..', '..', 'assets', 'upload'),
    );
  }
}
