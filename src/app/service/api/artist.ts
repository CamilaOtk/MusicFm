import { environment } from 'src/environments/environment'
import {http} from '../http'

export const listBySearch = (search: string) => http.get(`?method=artist.search&artist=${search}&api_key=${environment.apiKey}&format=json`)