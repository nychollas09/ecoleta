import { ItemRepository } from '../repository/item.repository';
import { knexConnection } from '../database/config/knex.config';

export class ItemService {
  private itemRepository = new ItemRepository();

  public async getByPointId(idPoint: number) {
    const transaction = await knexConnection.transaction();
    return this.itemRepository.getByPointId(idPoint, transaction);
  }
}
