// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "@reduxjs/toolkit";
import necessityLetterSlice, { NecessityLetterState } from "./necessityLetterSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const rootReducer = combineReducers({
  necessityLetter: necessityLetterSlice,
});

export type RootState = {
  necessityLetter: NecessityLetterState;
};

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["necessityLetter"], // Persist is user refreshes the page
};

// Persisted reducer
const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});
