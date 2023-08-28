import { createSlice } from "@reduxjs/toolkit";

const initialUserState = {
  value: {
    userId: null,
    email: null,
    token: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setUser: (state, action) => {
      const { token, email, _id } = action.payload;
      state.value = {
        userId: _id,
        email,
        token,
      };
    },
  },
});
export const { setUser } = userSlice.actions;
export default userSlice.reducer;
