import { Item } from './item';

export class Point {
  public id: number;
  public name: string;
  public email: string;
  public image: File;
  public whatsapp: string;
  public latitude: number;
  public longitude: number;
  public city: string;
  public uf: string;

  public items: Item[] = [];
  public idsItems: number[] = [];

  constructor(init?: Partial<Point>) {
    Object.assign(this, init);
    if (init && init.items) {
      this.items = init.items.map((item) => new Item(item));
    }
  }
}
