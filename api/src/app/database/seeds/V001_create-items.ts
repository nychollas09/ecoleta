import Knex from 'knex';
import { Item } from '../../domain/model/item';

export async function seed(knex: Knex) {
  await knex('item').insert([
    new Item({ title: 'Lâmpadas', image: 'lampadas.svg' }),
    new Item({ title: 'Pilhas e Baterias', image: 'baterias.svg' }),
    new Item({ title: 'Papéis e Papelão', image: 'papeis-papelao.svg' }),
    new Item({ title: 'Resíduos Eletrônicos', image: 'eletronicos.svg' }),
    new Item({ title: 'Resíduos Orgânicos', image: 'organicos.svg' }),
    new Item({ title: 'Óleo de Cozinha', image: 'oleo.svg' }),
  ]);
}
