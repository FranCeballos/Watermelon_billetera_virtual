import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    movementsView: "empty",
  },
  reducers: {
    showSend: (state) => {
      state.movementsView = "send";
    },
    showDeposit: (state) => {
      state.movementsView = "deposit";
    },
    close: (state) => {
      state.movementsView = "empty";
    },
  },
});

export const { showSend, showDeposit, close } = uiSlice.actions;

export default uiSlice.reducer;
