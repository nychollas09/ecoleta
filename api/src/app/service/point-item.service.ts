import { PointItemRepository } from '../repository/point-item.repository';
import { PointItem } from '../domain/model/point-item';
import { knexConnection } from '../database/config/knex.config';

export class PointItemService {
  private pointItemRepository = new PointItemRepository();

  public async create(pointsItems: PointItem[]) {
    return await this.pointItemRepository.create(
      pointsItems,
      await knexConnection.transaction(),
    );
  }
}
