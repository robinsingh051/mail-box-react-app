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
  },
});

export const emailActions = emailSlice.actions;
export default emailSlice.reducer;
