import { ItemRepository } from '../repository/item.repository';
import { knexConnection } from '../database/config/knex.config';
import { Response } from 'express';
import { Item } from '../domain/model/item';
import { ItemDTO } from '../domain/dto/item-dto';

export class ItemService {
  private itemRepository = new ItemRepository();

  public async index(response: Response) {
    const transaction = await knexConnection.transaction();
    const items = await transaction<Item>('item').select('*');
    transaction.commit();
    return response.json(items.map((item: Item) => new ItemDTO({ ...item })));
  }

  public async getByPointId(idPoint: number) {
    const transaction = await knexConnection.transaction();
    return this.itemRepository.getByPointId(idPoint, transaction);
  }
}
