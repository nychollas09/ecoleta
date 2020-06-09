export interface Municipio {
  id: number;
  nome: string;
  microrregiao: {
    id: number;
    nome: string;
  };
}
