import { createSlice } from '@reduxjs/toolkit';
import { AuthState } from './auth.types';
import { logIn } from './auth.thunks';
import { secureSessionStorage } from '../../../shared/secureStorage';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    idInstance: secureSessionStorage.getItem('idInstance') || '',
    apiTokenInstance: secureSessionStorage.getItem('apiTokenInstance') || '',
    authLoading: false,
    authError: {
      status: false,
      value: null
    }
  } as AuthState,
  reducers: {
    logOut(state) {
      state.idInstance = '';
      state.apiTokenInstance = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(logIn.pending, (state) => {
      state.authError.status = false;
      state.authError.value = '';
      state.authLoading = true;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.authLoading = false;
      const { idInstance, apiTokenInstance } = action.payload;
      state.idInstance = idInstance;
      state.apiTokenInstance = apiTokenInstance;
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.authLoading = false;
      state.authError.status = true;
      state.authError.value = action.payload;
    });
  }
});

export const authActions = {
  logIn,
  logOut: authSlice.actions.logOut
};

export default authSlice.reducer;
