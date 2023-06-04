import { LogInData } from '../shared/types';
import { basicRequest } from './templates';

export const fetchAuthState = async ({ idInstance, apiTokenInstance }: LogInData) => {
  return await basicRequest
    .get(`https://api.green-api.com/waInstance${idInstance}/getStateInstance/${apiTokenInstance}`)
    .json();
};
