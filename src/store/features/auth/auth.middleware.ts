import { Middleware } from '@reduxjs/toolkit';
import { authActions } from './auth.slice';
import { secureSessionStorage } from '../../../shared/secureStorage';

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (authActions.logIn.fulfilled.match(action)) {
    if (action.payload) {
      secureSessionStorage.setItem('idInstance', action.payload.idInstance);
      secureSessionStorage.setItem('apiTokenInstance', action.payload.apiTokenInstance);
    }
  } else if (authActions.logOut.match(action)) {
    secureSessionStorage.removeItem('idInstance');
    secureSessionStorage.removeItem('apiTokenInstance');
  }
  return next(action);
};
