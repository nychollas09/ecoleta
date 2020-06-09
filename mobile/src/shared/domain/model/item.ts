export class Item {
  public id: number;
  public title: string;
  public image: string;
  public imageUrl: string;

  constructor(init?: Partial<Item>) {
    Object.assign(this, init);
  }
}
