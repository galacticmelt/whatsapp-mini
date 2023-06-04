import { basicRequest } from './templates';
import { ContactInfoRequest, WhatsAppStatusRequest } from '../shared/types';

export const fetchContactInfo = async (params: ContactInfoRequest) => {
  const { idInstance, apiTokenInstance, chatId } = params;
  return await basicRequest
    .post(`https://api.green-api.com/waInstance${idInstance}/getContactInfo/${apiTokenInstance}`, {
      body: JSON.stringify({ chatId })
    })
    .json();
};

export const fetchWhatsAppStatus = async (params: WhatsAppStatusRequest) => {
  const { idInstance, apiTokenInstance, phoneNumber } = params;
  return await basicRequest
    .post(`https://api.green-api.com/waInstance${idInstance}/checkWhatsapp/${apiTokenInstance}`, {
      body: JSON.stringify({ phoneNumber })
    })
    .json();
};
