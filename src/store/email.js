import { createSlice } from "@reduxjs/toolkit";

const emailInitialState = {
  sentEmails: [],
  recievedEmails: [],
  unreadMails: 0,
};

const emailSlice = createSlice({
  name: "email",
  initialState: emailInitialState,
  reducers: {
    setSentEmails(state, action) {
      state.sentEmails = action.payload;
    },
    setRecievedEmails(state, action) {
      state.recievedEmails = action.payload;
      let items = action.payload;
      let count = 0;
      for (let i = 0; i < items.length; i++) {
        if (items[i].isRead === false) {
          count++;
        }
      }
      state.unreadMails = count;
    },
    addMailtoSentMails(state, action) {
      state.sentEmails.push(action.payload);
    },
    addMailtoRecievedMails(state, action) {
      state.recievedEmails.push(action.payload);
      state.unreadMails++;
    },
    deleteMailfromRecievedMails(state, action) {
      const m = state.recievedEmails.filter(
        (mail) => mail.id === action.payload
      );
      if (m[0].isRead === false) {
        state.unreadMails--;
      }
      state.recievedEmails = state.recievedEmails.filter(
        (mail) => mail.id !== action.payload
      );
    },
    deleteMailfromSentMails(state, action) {
      state.sentEmails = state.sentEmails.filter(
        (mail) => mail.id !== action.payload
      );
    },
    setRecievedEmailsRead(state, action) {
      const m = state.recievedEmails.filter(
        (mail) => mail.id === action.payload
      );
      m[0].isRead = true;
      state.unreadMails--;
    },
  },
});

export const emailActions = emailSlice.actions;
export default emailSlice.reducer;
