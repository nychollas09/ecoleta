import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import './styles.css';

import { Map, TileLayer, Marker } from 'react-leaflet';
import { ecoletaApi, ibgeApi } from '../../services/api';
import { Item } from 'src/shared/domain/model/item';
import { Uf } from 'src/shared/domain/interface/uf';
import { Municipio } from 'src/shared/domain/interface/municipio';
import { LeafletMouseEvent } from 'leaflet';
import { Point } from 'src/shared/domain/model/point';

export default function CreatePoint() {
  const [inicialPosition, setInicialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<Uf[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);

  const [selectedUf, setSelectedUf] = useState<string>('0');
  const [selectedCity, setSelectedCity] = useState<string>('0');
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);
  const [idsItems, setIdsItems] = useState<number[]>([]);

  const [point, setPoint] = useState<Point>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInicialPosition([latitude, longitude]);
    });
  }, []);

  useEffect(() => {
    ecoletaApi.get<Item[]>('item').then((response) => setItems(response.data));
  }, []);

  useEffect(() => {
    ibgeApi.get<Uf[]>('').then((response) => setUfs(response.data));
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    ibgeApi
      .get<Municipio[]>(`${selectedUf}/municipios`)
      .then((response) => setMunicipios(response.data));
  }, [selectedUf]);

  function handleMapClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
    setSelectedPosition([lat, lng]);
  }

  function handleSelectedUf(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedUf(event.target.value);
  }

  function handleSelectedCity(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedCity(event.target.value);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setPoint(new Point({ ...point, [name]: value }));
  }

  function handleSelectItem(idItem: number) {
    if (idsItems.includes(idItem)) {
      setIdsItems(idsItems.filter((item) => item !== idItem));
    } else {
      setIdsItems([...idsItems, idItem]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const [latitude, longitude] = selectedPosition;
    const pointToSave = new Point({
      ...point,
      idsItems,
      image: 'image-tmp',
      latitude,
      longitude,
      city: selectedCity,
      uf: selectedUf,
    });
    ecoletaApi
      .post<Point>('point', pointToSave)
      .then(() => {
        alert('Ponto de coleta criado!');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div id="page-create-point">
      <form autoComplete="off" onSubmit={handleSubmit}>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={inicialPosition} zoom={15} onClick={handleMapClick}>
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                name="uf"
                id="uf"
                onChange={handleSelectedUf}
                value={selectedUf}
              >
                <option value="0">Selecione uma UF</option>
                {ufs.map((uf) => (
                  <option key={uf.id} value={uf.sigla}>
                    {uf.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                onChange={handleSelectedCity}
                value={selectedCity}
                disabled={selectedUf ? false : true}
              >
                <option value="0">Selecione uma cidade</option>
                {municipios.map((municipio) => (
                  <option key={municipio.id} value={municipio.nome}>
                    {municipio.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Ítens de coleta</h2>
            <span>Selecione um ou mais ítens abaixo</span>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSelectItem(item.id)}
                className={idsItems.includes(item.id) ? 'selected' : ''}
              >
                <img src={item.imageUrl} alt={item.title} />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>
        </fieldset>

        <button type="submit">Cadatrar ponto de coleta</button>
      </form>
    </div>
  );
}
