import $ from "jquery";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import defaultUser from "../../constants/user";
import route from "../../constants/routes";

export const login = createAsyncThunk("user/login", async (data) => {
  return await $.post(`${route.api}login`, data);
});

const userSlice = createSlice({
  name: "user",
  initialState: defaultUser,
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      console.log(payload);
    },
  },
});

export default userSlice.reducer;
