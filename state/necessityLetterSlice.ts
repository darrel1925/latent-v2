import { NecessityLetter } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface NecessityLetterState {
  letters: NecessityLetter[];
}

const initialState: NecessityLetterState = {
  letters: [],
};

export const necessityLetterSlice = createSlice({
  name: "necessityLetter",
  initialState: initialState,
  reducers: {
    getLetterWithID: (state, action: PayloadAction<{ id: string }>) => {},
    addLetter: (state, action: PayloadAction<{ letter: NecessityLetter }>) => {
      state.letters.push(action.payload.letter);
    },
    updateContent: (state, action: PayloadAction<{ id: string; content: string }>) => {
      const letter = state.letters.find((letter) => letter.id === action.payload.id);
      if (letter) {
        letter.content = action.payload.content;
      }
    },
  },
});

export const { getLetterWithID, addLetter, updateContent } = necessityLetterSlice.actions;
export default necessityLetterSlice.reducer;
