import { createSlice } from '@reduxjs/toolkit';
import { MessagesState } from './messages.types';
import { listenForMessages } from './messages.thunks';

const messagesSlice = createSlice({
  name: 'currentChat',
  initialState: {
    messages: [],
    messagesListening: false,
    messagesError: {
      status: false,
      value: null
    }
  } as MessagesState,
  reducers: {
    unsetCurrentChat(state) {
      state.messages = [];
      state.messagesListening = false;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(listenForMessages.pending, (state) => {
      state.messagesListening = true;
      state.messagesError.status = false;
      state.messagesError.value = null;
    });
    builder.addCase(listenForMessages.fulfilled, (state, action) => {
      if (action.payload) {
        state.messages = [action.payload, ...state.messages];
      }
    });
    builder.addCase(listenForMessages.rejected, (state, action) => {
      state.messagesListening = false;
      state.messagesError.status = true;
      state.messagesError.value = action.payload;
    });
  }
});

export const messagesActions = {
  listenForMessages,
  unsetMessages: messagesSlice.actions.unsetCurrentChat
};

export default messagesSlice.reducer;
