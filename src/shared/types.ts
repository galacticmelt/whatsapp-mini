export interface LogInData {
  idInstance: string;
  apiTokenInstance: string;
}

export interface ContactInfoRequest extends LogInData {
  chatId: string;
}

export interface WhatsAppStatusRequest extends LogInData {
  phoneNumber: number;
}

export interface SendMessageRequest extends LogInData {
  chatId: string;
  message: string;
}

export interface DeleteNotificationRequest extends LogInData {
  receiptId: number;
}
