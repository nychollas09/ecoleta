import { Regiao } from './regiao';

export interface Uf {
  id: number;
  nome: string;
  sigla: string;
  regiao: Regiao;
}
