import { ItemDTO } from './item-dto';
import { Point } from '../model/point';

export class PointDTO {
  public id: number;
  public name: string;
  public email: string;
  public image: string;
  public whatsapp: string;
  public latitude: number;
  public longitude: number;
  public city: string;
  public uf: string;

  public items: ItemDTO[] = [];
  public idsItems: number[] = [];

  constructor(init?: Partial<PointDTO>) {
    Object.assign(this, init);
    if (init && init.items) {
      this.items = init.items.map((item) => new ItemDTO(item));
    }
  }

  public toEntity(): Point {
    const pointDTO: PointDTO = { ...this };
    Reflect.deleteProperty(pointDTO, 'items');
    Reflect.deleteProperty(pointDTO, 'idsItems');
    return new Point({ ...pointDTO });
  }
}
