import axios from 'axios'
import { enviorment } from './enviorment'
export const Client = axios.create({ baseURL: enviorment.__API })