import { ItemRepository } from '../repository/item.repository';
import { knexConnection } from '../database/config/knex.config';

export class ItemService {
  private itemRepository = new ItemRepository();

  public async getByPointId(idPoint: number) {
    const transaction = await knexConnection.transaction();
    const items = this.itemRepository.getByPointId(idPoint, transaction);
    transaction.commit();
    return items;
  }
}
