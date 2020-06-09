import axios from 'axios';
import { environment } from '../environments/environment';

export const ecoletaApi = axios.create({
  baseURL: environment.ecoletaApi,
});

export const ibgeApi = axios.create({
  baseURL: environment.ibgeApi,
});
