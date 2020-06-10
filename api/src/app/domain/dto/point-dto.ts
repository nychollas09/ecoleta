import { environment } from './../../../environments/environment';
import { ItemDTO } from './item-dto';
import { Point } from '../model/point';

export class PointDTO {
  public id: number;
  public name: string;
  public email: string;
  public image: string;
  public imageUrl: string;
  public whatsapp: string;
  public latitude: number;
  public longitude: number;
  public city: string;
  public uf: string;

  public items: ItemDTO[] = [];
  public idsItems: number[] = [];

  constructor(init?: Partial<PointDTO>) {
    Object.assign(this, init);
    if (init) {
      if (init.items) {
        this.items = init.items.map((item) => new ItemDTO(item));
      }
      if (init.image) {
        this.imageUrl = `${environment.apiBaseUrl}/upload/${this.image}`;
      }
    }
  }

  public toEntity(): Point {
    const pointDTO: PointDTO = { ...this };
    Reflect.deleteProperty(pointDTO, 'items');
    Reflect.deleteProperty(pointDTO, 'idsItems');
    Reflect.deleteProperty(pointDTO, 'imageUrl');
    return new Point({ ...pointDTO });
  }
}
