import { Request, Response, Router } from 'express';
import { PointDTO } from '../domain/dto/point-dto';
import { ControllerBase } from '../domain/interface/controller-base';
import { PointService } from '../service/point.service';

export class PointController implements ControllerBase {
  public path: string = '/point';
  public router: Router = Router();

  private pointService = new PointService();

  constructor() {
    this.initRoutes();
  }

  public initRoutes(): void {
    this.router.post(this.path, this.createPoint());
  }

  private createPoint() {
    return async (request: Request, response: Response) => {
      return await this.pointService.create(
        new PointDTO(...request.body),
        response,
      );
    };
  }
}
