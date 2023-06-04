import { createSlice } from '@reduxjs/toolkit';
import { ContactInfoState } from './contactInfo.types';
import { checkWhatsAppStatus, setContactInfo } from './contactInfo.thunks';

const contactInfoSlice = createSlice({
  name: 'contactInfo',
  initialState: {
    chatId: '',
    name: '',
    phoneNumber: '',
    hasWhatsApp: false,
    contactLoading: false,
    contactError: {
      status: false,
      value: null
    }
  } as ContactInfoState,
  reducers: {
    unsetContactInfo(state) {
      state.chatId = '';
      state.name = '';
      state.phoneNumber = '';
    }
  },
  extraReducers: (builder) => {
    builder.addCase(setContactInfo.pending, (state) => {
      state.contactError.status = false;
      state.contactError.value = '';
      state.contactLoading = true;
    });
    builder.addCase(setContactInfo.fulfilled, (state, action) => {
      const { chatId, name } = action.payload;
      return {
        ...state,
        chatId: state.hasWhatsApp ? chatId : null,
        name,
        phoneNumber: `+${chatId.slice(0, 11)}`,
        contactLoading: false
      };
    });
    builder.addCase(setContactInfo.rejected, (state, action) => {
      state.contactLoading = false;
      state.contactError.status = true;
      state.contactError.value = action.payload;
    });
    builder.addCase(checkWhatsAppStatus.pending, (state) => {
      state.contactError.status = false;
      state.contactError.value = '';
      state.contactLoading = true;
    });
    builder.addCase(checkWhatsAppStatus.fulfilled, (state, action) => {
      state.hasWhatsApp = action.payload.existsWhatsapp;
    });
    builder.addCase(checkWhatsAppStatus.rejected, (state, action) => {
      state.contactLoading = false;
      state.contactError.status = true;
      state.contactError.value = action.payload;
    });
  }
});

export const contactInfoActions = {
  setContactInfo,
  checkWhatsAppStatus,
  unsetContactInfo: contactInfoSlice.actions.unsetContactInfo
};

export default contactInfoSlice.reducer;
