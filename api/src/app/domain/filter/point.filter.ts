export class PointFilter {
  public idsItems: number[];
  public city: string;
  public uf: string;

  public hasIdsItems(): boolean {
    return this.idsItems && this.idsItems.length > 0;
  }

  public hasCity(): boolean {
    return !!this.city;
  }

  public hasUf(): boolean {
    return !!this.uf;
  }

  constructor(init?: Partial<PointFilter>) {
    Object.assign(this, init);
  }
}
