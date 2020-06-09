export class PointItem {
  public id: number;
  public point_id: number;
  public item_id: number;

  constructor(init?: Partial<PointItem>) {
    Object.assign(this, init);
  }
}
