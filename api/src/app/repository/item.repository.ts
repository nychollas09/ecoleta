import knex from 'knex';
import { Item } from '../domain/model/item';
export class ItemRepository {
  private TABLE = 'item';
  private POINT_ITEM = 'point_item';

  public async getByPointId(
    idPoint: number,
    transcation: knex.Transaction,
  ): Promise<Item[]> {
    const itemsUninstancied = await transcation(this.TABLE)
      .select(`${this.TABLE}.*`)
      .join(
        this.POINT_ITEM,
        `${this.POINT_ITEM}.ITEM_ID`,
        '=',
        `${this.TABLE}.ID`,
      )
      .where(`${this.POINT_ITEM}.POINT_ID`, idPoint);
    return itemsUninstancied.map((item: Item) => new Item(item));
  }
}
