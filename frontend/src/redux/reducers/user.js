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
  reducers: {
    offToast: (state) => {
      state.toast = defaultUser.toast;
    },
    logoutUser: (state) => {
      for (const key in defaultUser) {
        if (Object.hasOwnProperty.call(defaultUser, key)) {
          const element = defaultUser[key];
          state[key] = element;
        }
      }
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.toast = { ...payload, trigger: true };
      state.isLoggedIn = false;
      if (payload.status) {
        state.name = payload.data.name;
        state.email = payload.data.email;
        state.token = payload.data.token;
        state.isLoggedIn = true;

        const d = new Date();
        d.setTime(d.getTime() + 24 * 60 * 60 * 1000);
        const expires = "expires=" + d.toUTCString();
        document.cookie = `token=${payload.data.token}; expires=${expires}`;
      }
    },
  },
});

export default userSlice.reducer;
export const { offToast, logoutUser } = userSlice.actions;
//
