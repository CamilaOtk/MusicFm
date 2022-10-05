import { environment } from 'src/environments/environment';
import { http } from '../http';

// export const listBySearch = async (search: string)  => {
//   try {
//     return await http.get(
//       `?method=artist.search&artist=${search}&api_key=${environment.apiKey}&format=json`
//     );
//   } catch (err) {
//     console.log('err', err);
//     return;
//   }
// };
export const listBySearch = (search: string) =>
   http.get(
    `?method=artist.search&artist=${search}&api_key=${environment.apiKey}&format=json`
  );
