import { configureStore } from "@reduxjs/toolkit";

import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";

import metadata from "./reducers/metadata";
import toast from "./reducers/toast";
import shows from "./reducers/shows";

import user from "./reducers/user";

const reducers = combineReducers({ metadata, toast, user, shows });
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["metadata", "toast", "user"],
};
const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
