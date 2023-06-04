import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchContactInfo, fetchWhatsAppStatus } from '../../../api/contact-info-api';
import { ContactInfoRequest, WhatsAppStatusRequest } from '../../../shared/types';

export const setContactInfo = createAsyncThunk(
  'auth/setContactInfo',
  async (params: ContactInfoRequest, { rejectWithValue }) => {
    try {
      return await fetchContactInfo(params);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.name + ': ' + e.message);
        return rejectWithValue(e.message);
      }
    }
  }
);

export const checkWhatsAppStatus = createAsyncThunk(
  'auth/checkWhatsAppStatus',
  async (params: WhatsAppStatusRequest, { rejectWithValue }) => {
    try {
      return await fetchWhatsAppStatus(params);
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.name + ': ' + e.message);
        return rejectWithValue(e.message);
      }
    }
  }
);
