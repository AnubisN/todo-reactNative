import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./reducers/notesSlice";
import { setupListeners } from "@reduxjs/toolkit/query";
import authSlice from "./reducers/authSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    auth: authSlice,
  },
});

setupListeners(store.dispatch);

export default store;
