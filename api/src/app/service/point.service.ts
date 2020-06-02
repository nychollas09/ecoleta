import { Response } from 'express';
import { knexConnection } from '../database/config/knex.config';
import { ItemDTO } from '../domain/dto/item-dto';
import { PointDTO } from '../domain/dto/point-dto';
import { PointItem } from '../domain/model/point-item';
import { PointRepository } from '../repository/point.repository';
import { PointItemService } from './point-item.service';
import { ItemService } from './item.service';

export class PointService {
  private pointRepository = new PointRepository();
  private pointItemService = new PointItemService();
  private itemService = new ItemService();

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
