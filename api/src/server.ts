import express, { Request, Response } from 'express';

const app = express();

app.use('/users', (request: Request, response: Response) => {
  return response.json([
    {
      nome: 'Nichollas',
      idade: 19,
    },
    {
      nome: 'Falcão',
      idade: 19,
    },
    {
      nome: 'Santos',
      idade: 19,
    },
  ]);
});

console.log('funcionando!');

app.listen(3333);
