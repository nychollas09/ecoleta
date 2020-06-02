import { ItemRepository } from '../repository/item.repository';
import { knexConnection } from '../database/config/knex.config';

export class ItemService {
  private itemRepository = new ItemRepository();

  public async getByPointId(idPoint: number) {
    return await this.itemRepository.getByPointId(
      idPoint,
      await knexConnection.transaction(),
    );
  }
}
