import { createSlice } from "@reduxjs/toolkit";

export const defaultStatus = { title: "", message: "", status: false, loading: false, show: false };

const statusSlice = createSlice({
  name: "status",
  initialState: defaultStatus,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setToast: (state, { payload }) => {
      state.title = payload.title;
      state.message = payload.message;
      state.status = payload.status;
      state.show = payload.show;
    },
  },
});

export const { setLoading, setToast } = statusSlice.actions;
export default statusSlice.reducer;
