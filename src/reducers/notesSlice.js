import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {
    notes: [],
    note: {},
  },
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.value.notes = action.payload;
    },
    getNote: (state, action) => {
      const filteredNotes = state.value.notes.filter(
        (el) => el.id === action.payload
      );
      state.value.note = { ...filteredNotes[0] };
    },
    updateNotes: (state, action) => {
      const filteredNotes = state.value.notes.filter(
        (el) => el.id !== action.payload.id
      );
      const updatedNotes = [...filteredNotes, action.payload];
      state.value.notes = [...updatedNotes];
    },
    deleteNotes: (state, action) => {
      const filteredNotes = state.value.notes.filter(
        (el) => el.id !== action.payload
      );
      state.value.notes = [...filteredNotes];
    },
  },
});

export const { setNotes, getNote, updateNotes, deleteNotes } =
  notesSlice.actions;

export default notesSlice.reducer;
