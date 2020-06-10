import { environment } from './../environments/environment';
import express, { Application, Request, Response, Router } from 'express';
import cors from 'cors';
import path from 'path';

export class App {
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; controllers: { router: Router }[] }) {
    this.app = express();
    this.port = appInit.port;
    this.app.use(express.json());
    this.app.use(
      cors({
        maxAge: 3600,
        credentials: true,
        origin: environment.allowOrigins,
        methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
      }),
    );
    this.app.use(
      '/upload',
      express.static(path.resolve(__dirname, '..', 'assets', 'upload')),
    );
    this.routes(appInit.controllers);
    this.wildCart();
  }

  public routes(controllers: { router: Router }[]): void {
    controllers.forEach((controller) => {
      this.app.use('', controller.router);
    });
  }

  private wildCart() {
    this.app.use('/*', (request: Request, response: Response) => {
      return response.status(404).json({ message: 'Endpoint not found' });
    });
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on the http://localhost:${this.port}`);
    });
  }
}
