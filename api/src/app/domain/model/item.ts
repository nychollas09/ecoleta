import { ItemDTO } from '../dto/item-dto';

export class Item {
  public id: number;
  public title: string;
  public image: string;

  constructor(init?: Partial<Item>) {
    Object.assign(this, init);
  }

  public toDTO(): ItemDTO {
    return new ItemDTO({ ...this });
  }
}
