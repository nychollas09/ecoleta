import { PointItem } from '../domain/model/point-item';
import knex from 'knex';

export class PointItemRepository {
  public async create(pointsItems: PointItem[], transcation: knex.Transaction) {
    return await transcation('point_item').insert(pointsItems);
  }
}
