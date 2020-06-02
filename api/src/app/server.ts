import { App } from './app';
import { ItemController } from './controller/item.controller';
import { PointController } from './controller/point.controller';

const port = Number(process.env.PORT) || 3333;

const app = new App({
  port,
  controllers: [new ItemController(), new PointController()],
});

app.listen();
