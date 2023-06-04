export const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const EMPTY_STRING = '';
export const EMPTY_NAME = '🫐🫐🫐';

export const ERROR_TEXT = {
  UNAUTHORIZED: 'Проверьте введенные данные'
};

export const EMOJI_DECIMAL_CODES = [
  128512, 128513, 128514, 128517, 128529, 128549, 128564, 128557, 129313
];

export const STARTER_TITLE = 'WhatsApp Web Mini';
export const STARTER_INFO =
  'Отправаляйте и получайте сообщения Whats App прямо здесь, без использования своего мобильного устройства. Для того чтобы начать общаться, введите номер телефона собеседника и нажмите на "поиск".';

export const NO_WHATSAPP_INFO =
  'За данным номером телефона не закреплен профиль WhatsApp, переписка недоступна.';

export const START_MESSAGING = 'Отлично! Вы можете начать переписку.';

export const OUTGOING_MESSAGE = 'outgoingMessageReceived';
export const OUTGOING_MESSAGE_API = 'outgoingAPIMessageReceived';
export const INCOMING_MESSAGE = 'incomingMessageReceived';
export const INCOMING_MESSAGE_API = 'incomingAPIMessageReceived';

export const NOTIFICATION_TYPES = new Set([
  OUTGOING_MESSAGE,
  OUTGOING_MESSAGE_API,
  INCOMING_MESSAGE,
  INCOMING_MESSAGE_API
]);

export const ID_INSTANCE_VALIDATION = {
  required: 'Это поле обязательно у заполнению',
  pattern: {
    value: /^[0-9]/,
    message: 'Недопустимые символы'
  }
};

export const API_TOKEN_VALIDATION = {
  required: 'Это поле обязательно у заполнению',
  validate: (value: string) => {
    if (value.match(/[а-яА-Я]/)) {
      return 'Недопустимые символы';
    }
    return true;
  }
};
