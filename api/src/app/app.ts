import express, { Application, Request, Response, Router } from 'express';

export class App {
  public app: Application;
  public port: number;

  constructor(appInit: { port: number; controllers: { router: Router }[] }) {
    this.app = express();
    this.port = appInit.port;
    this.app.use(express.json());
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
