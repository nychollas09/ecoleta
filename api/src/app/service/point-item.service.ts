import knex from 'knex';
import { PointItem } from '../domain/model/point-item';
import { PointItemRepository } from '../repository/point-item.repository';

export class PointItemService {
  private pointItemRepository = new PointItemRepository();

  public async create(pointsItems: PointItem[], transaction: knex.Transaction) {
    const idsPointsItems = this.pointItemRepository.create(
      pointsItems,
      transaction,
    );
    return idsPointsItems;
  }
}
