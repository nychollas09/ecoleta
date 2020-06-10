import { Request, Response, Router } from 'express';
import { PointDTO } from '../domain/dto/point-dto';
import { ControllerBase } from '../domain/interface/controller-base';
import { PointService } from '../service/point.service';
import { PointFilter } from '../domain/filter/point.filter';
import multer from 'multer';
import multerConfig from '../config/multer.config';

export class PointController implements ControllerBase {
  public path: string = '/point';
  public router: Router = Router();
  private upload = multer(multerConfig);
  private pointService = new PointService();

  constructor() {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.get(this.path, this.index());
    this.router.get(`${this.path}/:id`, this.show());
    this.router.post(this.path, this.upload.single('image'), this.create());
  }

  public index() {
    return async (request: Request, response: Response) => {
      const { city, uf, items } = request.query;
      const idsItems = String(items)
        .split(',')
        .map((item) => Number(item));
      return await this.pointService.index(
        new PointFilter({
          city: city ? String(city) : undefined,
          uf: uf ? String(uf) : undefined,
          idsItems: items ? idsItems : undefined,
        }),
        response,
      );
    };
  }

  public show() {
    return async (request: Request, response: Response) => {
      return await this.pointService.show(Number(request.params.id), response);
    };
  }

  private create() {
    return async (request: Request, response: Response) => {
      const { idsItems } = request.body;
      request.body['idsItems'] = idsItems
        .split(',')
        .map((item: string) => Number(item.trim()));
      return await this.pointService.create(
        new PointDTO({ ...request.body, image: request.file.filename }),
        response,
      );
    };
  }
}
