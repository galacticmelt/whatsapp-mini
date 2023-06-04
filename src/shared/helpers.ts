import dayjs from 'dayjs';

export const normalizeMessageTime = (time: number) => {
  const parsed = dayjs.unix(time);
  return parsed.format('HH:mm');
};

export const formatPhoneNumber = (number: string) => {
  if (number.length === 12 && number[0] === '+') {
    return `${number.slice(1)}@c.us`;
  }
  if (number.length === 11 && number[0] === '7') {
    return `${number}@c.us`;
  }
  if (number.length === 11 && number[0] === '8') {
    return `7${number.slice(1)}@c.us`;
  }
  if (number.length === 10 && (number[0] === '8' || number[0] === '9')) {
    return `7${number}@c.us`;
  }
  return;
};
