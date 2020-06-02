import { Point } from '../domain/model/point';
import knex from 'knex';

export class PointRepository {
  public async create(
    point: Point,
    transcation: knex.Transaction,
  ): Promise<number> {
    return (await transcation('point').insert(point))[0];
  }
}
