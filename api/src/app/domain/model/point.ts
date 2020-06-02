import { PointDTO } from '../dto/point-dto';

export class Point {
  public id: number;
  public name: string;
  public email: string;
  public image: string;
  public whatsapp: string;
  public latitude: number;
  public longitude: number;
  public city: string;
  public uf: string;

  constructor(init?: Partial<Point>) {
    Object.assign(this, init);
  }

  public toDTO(): PointDTO {
    return new PointDTO({
      ...this,
    });
  }
}
