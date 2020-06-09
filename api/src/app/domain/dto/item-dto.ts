import { environment } from '../../../environments/environment';

export class ItemDTO {
  public id: number;
  public title: string;
  public image: string;
  public imageUrl: string;

  constructor(init?: Partial<ItemDTO>) {
    Object.assign(this, init);
    if (init && init.image) {
      this.imageUrl = `${environment.apiBaseUrl}/item/upload/${this.image}`;
    }
  }
}
