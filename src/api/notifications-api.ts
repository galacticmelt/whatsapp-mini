import { DeleteNotificationRequest, LogInData, SendMessageRequest } from '../shared/types';
import { basicRequest } from './templates';

export const receiveNotification = async (params: LogInData) => {
  const { idInstance, apiTokenInstance } = params;
  return await basicRequest
    .get(
      `https://api.green-api.com/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`
    )
    .json();
};

export const deleteNotification = async (params: DeleteNotificationRequest) => {
  const { idInstance, apiTokenInstance, receiptId } = params;
  return await basicRequest
    .delete(
      `https://api.green-api.com/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`
    )
    .json();
};

export const sendMessage = async (params: SendMessageRequest) => {
  const { idInstance, apiTokenInstance, chatId, message } = params;
  return await basicRequest
    .post(`https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiTokenInstance}`, {
      body: JSON.stringify({ chatId, message })
    })
    .json();
};
