import { EncryptStorage } from 'encrypt-storage';

const SECRET_KEY = import.meta.env.VITE_SECRET_KEY;

export const secureSessionStorage = new EncryptStorage(SECRET_KEY, {
  storageType: 'sessionStorage'
})