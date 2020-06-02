import { PointItemRepository } from '../repository/point-item.repository';
import { PointItem } from '../domain/model/point-item';
import { knexConnection } from '../database/config/knex.config';

export class PointItemService {
  private pointItemRepository = new PointItemRepository();

  public async create(pointsItems: PointItem[]) {
    const transaction = await knexConnection.transaction();
    const idsPointsItems = this.pointItemRepository.create(
      pointsItems,
      transaction,
    );
    transaction.commit();
    return idsPointsItems;
  }
}
