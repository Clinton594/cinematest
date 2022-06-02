import { configureStore } from "@reduxjs/toolkit";
import metadata from "./reducers/metadata";
import toast from "./reducers/toast";
import user from "./reducers/user";

const store = configureStore({
  reducer: { metadata, toast, user },
});

export default store;
