import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    auth: {},
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.value.auth = { ...action.payload };
    },
    deleteAuth: (state, action) => {
      state.value.auth = {};
    },
  },
});

export const { setAuth, deleteAuth } = authSlice.actions;

export default authSlice.reducer;
