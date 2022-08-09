import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./reducers/notesSlice";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});

setupListeners(store.dispatch);

export default store;
