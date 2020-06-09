import { Point } from '../domain/model/point';
import knex from 'knex';
import { PointFilter } from '../domain/filter/point.filter';

export class PointRepository {
  private TABLE = 'point';
  private POINT_ITEM = 'point_item';

  public async getByFilter(
    pointFilter: PointFilter,
    transcation: knex.Transaction,
  ) {
    const pointsUninstancied = await transcation(this.TABLE)
      .select(`${this.TABLE}.*`)
      .join(
        this.POINT_ITEM,
        `${this.POINT_ITEM}.POINT_ID`,
        '=',
        `${this.TABLE}.ID`,
      )
      .where((queryBuilder: knex.QueryBuilder) => {
        if (pointFilter.hasIdsItems()) {
          queryBuilder.whereIn(
            `${this.POINT_ITEM}.ITEM_ID`,
            pointFilter.idsItems,
          );
        }
        if (pointFilter.hasCity()) {
          queryBuilder.where(`${this.TABLE}.CITY`, pointFilter.city);
        }
        if (pointFilter.hasUf()) {
          queryBuilder.where(`${this.TABLE}.UF`, pointFilter.uf);
        }
      })
      .distinct();

    return Promise.resolve(pointsUninstancied.map((point) => new Point(point)));
  }

  public async create(
    point: Point,
    transcation: knex.Transaction,
  ): Promise<number> {
    return (await transcation(this.TABLE).insert(point))[0];
  }

  public async getById(
    idPoint: number,
    transcation: knex.Transaction,
  ): Promise<Point> {
    const pointUninstacied = await transcation(this.TABLE)
      .where('id', idPoint)
      .first();
    return Promise.resolve(new Point(pointUninstacied));
  }
}
