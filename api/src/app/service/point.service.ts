import { Response } from 'express';
import { knexConnection } from '../database/config/knex.config';
import { ItemDTO } from '../domain/dto/item-dto';
import { PointDTO } from '../domain/dto/point-dto';
import { Point } from '../domain/model/point';
import { PointItem } from '../domain/model/point-item';
import { PointRepository } from '../repository/point.repository';
import { ItemService } from './item.service';
import { PointItemService } from './point-item.service';
import { PointFilter } from '../domain/filter/point.filter';

export class PointService {
  private pointRepository = new PointRepository();
  private pointItemService = new PointItemService();
  private itemService = new ItemService();

  public async index(pointFilter: PointFilter, response: Response) {
    const transaction = await knexConnection.transaction();
    const points: Point[] = await this.pointRepository.getByFilter(
      pointFilter,
      transaction,
    );
    const pointsDTO: PointDTO[] = [];
    for (const point of points) {
      const pointDTO = point.toDTO();
      const items = await this.itemService.getByPointId(pointDTO.id);
      pointsDTO.push(
        new PointDTO({
          ...pointDTO,
          items: items.map((item) => item.toDTO()),
        }),
      );
    }
    transaction.commit();
    return response.json(pointsDTO);
  }

  public async show(idPoint: number, response: Response) {
    const transaction = await knexConnection.transaction();
    const point: Point = await this.pointRepository.getById(
      idPoint,
      transaction,
    );
    if (!point) {
      return response.status(400).json({ message: 'Point not found' });
    }
    const items: ItemDTO[] = (
      await this.itemService.getByPointId(idPoint)
    ).map((item) => item.toDTO());
    transaction.commit();
    return response.json(new PointDTO({ ...point, items }));
  }

  public async create(pointDTO: PointDTO, response: Response) {
    const point = pointDTO.toEntity();
    const transcation = await knexConnection.transaction();

    const point_id = await this.pointRepository.create(point, transcation);

    const pointsItems: PointItem[] = pointDTO.idsItems.map((item_id) => {
      return new PointItem({ point_id, item_id });
    });

    this.pointItemService.create(pointsItems);

    const items: ItemDTO[] = (
      await this.itemService.getByPointId(point_id)
    ).map((item) => new ItemDTO(item));

    await transcation.commit();
    return response.json(
      new PointDTO({
        id: point_id,
        ...point.toDTO(),
        items,
      }),
    );
  }
}
