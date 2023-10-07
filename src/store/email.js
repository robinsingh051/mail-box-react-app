import { createSlice } from "@reduxjs/toolkit";

const emailInitialState = {
  sentEmails: [],
  recievedEmails: [],
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
    },
    addMailtoSentMails(state, action) {
      state.sentEmails.push(action.payload);
    },
    addMailtoRecievedMails(state, action) {
      state.recievedEmails.push(action.payload);
    },
    deleteMailfromRecievedMails(state, action) {
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
    },
    setSentEmailsRead(state, action) {
      const m = state.sentEmails.filter((mail) => mail.id === action.payload);
      m[0].isRead = true;
    },
  },
});

export const emailActions = emailSlice.actions;
export default emailSlice.reducer;
