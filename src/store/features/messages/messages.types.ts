export type MessagesState = {
  messages: Message[];
  messagesListening: boolean;
  messagesError: {
    status: boolean;
    value: null | unknown;
  };
};

export type Message = {
  idMessage: string;
  type: string;
  textMessage: string;
  timestamp: Date;
};
