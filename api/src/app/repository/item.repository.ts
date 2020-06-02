import knex from 'knex';
import { Item } from '../domain/model/item';
export class ItemRepository {
  public async getByPointId(
    idPoint: number,
    transcation: knex.Transaction,
  ): Promise<Item[]> {
    return (
      await transcation.raw<Item>(
        `SELECT i.ID as \"id\", i.TITLE as \"title\", i.IMAGE as \"image\" FROM ITEM i LEFT JOIN POINT_ITEM pi ON pi.ITEM_ID = i.ID WHERE pi.POINT_ID = ${idPoint}`,
      )
    )[0].map((item: Item) => new Item(item));
  }
}
