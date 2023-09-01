import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  errors: {
    name: null,
    email: null,
    password: null,
    passwordConfirm: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setErrors: (state, action) => {
      const { name, email, password, passwordConfirm } = action.payload || {};
      state.errors = {
        name,
        email,
        password,
        passwordConfirm,
      };
    },
  },
});

export const { setErrors } = authSlice.actions;
export default authSlice.reducer;
