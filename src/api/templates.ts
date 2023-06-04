import ky from 'ky';
import { ERROR_TEXT } from '../shared/constants';

export const basicRequest = ky.create({
  headers: {
    'Content-Type': 'application/json'
  },
  hooks: {
    beforeError: [
      async (err) => {
        console.log(err);
        const { response } = err;
        switch (response.status) {
          case 401:
            err.message = ERROR_TEXT.UNAUTHORIZED;
            break;
          default:
            break;
        }
        return err;
      }
    ]
  }
});
