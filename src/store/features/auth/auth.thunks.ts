import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAuthState } from '../../../api/auth-api';
import { LogInData } from '../../../shared/types';

export const logIn = createAsyncThunk(
  'auth/checkAuthState',
  async (params: LogInData, { rejectWithValue }) => {
    try {
      const response = await fetchAuthState(params);
      if (response.stateInstance === 'authorized') {
        return params;
      } else if (response.stateInstance === 'notAuthorized') {
        return rejectWithValue('Проверьте статус инстанса в личном кабинете');
      }
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.name + ': ' + e.message);
        return rejectWithValue(e.message);
      }
    }
  }
);
