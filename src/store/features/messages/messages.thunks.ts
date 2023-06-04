import { createAsyncThunk } from '@reduxjs/toolkit';
import { deleteNotification, receiveNotification } from '../../../api/notifications-api';
import { LogInData } from '../../../shared/types';
import { NOTIFICATION_TYPES } from '../../../shared/constants';

export const listenForMessages = createAsyncThunk(
  'messages/listenForMessages',
  async (params: LogInData, { rejectWithValue, getState }) => {
    try {
      const { chatId } = getState().contactInfo;
      const { idInstance, apiTokenInstance } = getState().auth;
      const notification = await receiveNotification(params);
      if (!notification) {
        return null;
      }
      await deleteNotification({ idInstance, apiTokenInstance, receiptId: notification.receiptId });
      const { idMessage, timestamp, senderData, messageData, typeWebhook } = notification.body;
      if (senderData.chatId === chatId) {
        if (NOTIFICATION_TYPES.has(typeWebhook)) {
          return {
            idMessage,
            timestamp,
            type: typeWebhook,
            textMessage:
              messageData.typeMessage === 'textMessage'
                ? messageData?.textMessageData?.textMessage
                : messageData?.extendedTextMessageData?.text
          };
        }
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.name + ': ' + e.message);
        return rejectWithValue(e.message);
      }
    }
  }
);
