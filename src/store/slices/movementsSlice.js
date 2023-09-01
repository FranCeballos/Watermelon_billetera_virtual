import { createSlice } from "@reduxjs/toolkit";

const movementsSlice = createSlice({
  name: "movements",
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

export const { showSend, showDeposit, close } = movementsSlice.actions;
export default movementsSlice.reducer;
