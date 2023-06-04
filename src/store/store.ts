import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/auth.slice';
import contactInfoReducer from './features/contactInfo/contactInfo.slice';
import messagesReducer from './features/messages/messages.slice';
import { authMiddleware } from './features/auth/auth.middleware';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    contactInfo: contactInfoReducer,
    messages: messagesReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
