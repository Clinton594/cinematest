import $ from "jquery";
import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import defaultShows from "../../constants/defaultShow";
import route from "../../constants/routes";

export const getMovies = createAsyncThunk("show/getMovies", async () => {
  return await $.get(`${route.api}movies`);
});

export const createMovie = createAsyncThunk("show/createMovie", async (data) => {
  return await $.post(`${route.api}create-movie`, data);
});

export const deleteMovie = createAsyncThunk("show/deleteMovie", async (data) => {
  return await $.post(`${route.api}delete-movie`, data);
});
// Bookings
export const getBookings = createAsyncThunk("show/getBookings", async () => {
  return await $.get(`${route.api}bookings`);
});

export const createBooking = createAsyncThunk("show/createBooking", async (data) => {
  return await $.post(`${route.api}create-booking`, data);
});

export const deleteBooking = createAsyncThunk("show/deleteBooking", async (data) => {
  return await $.post(`${route.api}delete-booking`, data);
});

export const getShows = createAsyncThunk("show/getShows", async (uri) => {
  uri = uri !== undefined ? `?${uri}` : "";
  return await $.get(`${route.api}shows${uri.toLowerCase()}`);
});

const showSlice = createSlice({
  name: "show",
  initialState: defaultShows,
  reducers: {
    resetToast: (state) => {
      state.toast = { trigger: false };
      state.edit = false;
    },
    editSlice: (state, { payload }) => {
      state.edit = payload;
    },
  },
  extraReducers: {
    // Get Movie
    [getMovies.pending]: (state) => {
      state.loading = true;
    },
    [getMovies.rejected]: (state) => {
      state.loading = false;
    },
    [getMovies.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.status) {
        state.movies = payload.data;
      }
    },
    // Create new movie
    [createMovie.pending]: (state) => {
      state.loading = true;
    },
    [createMovie.rejected]: (state, { payload }) => {
      state.loading = false;
      state.toast = { ...payload, trigger: true };
    },
    [createMovie.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.status) {
        const { data } = payload;
        let movies = state.movies;
        if (payload.edited) {
          state.movies = current(movies).map((x) => {
            if (x.id === data.id) {
              x = data;
            }
            return x;
          });
        } else {
          movies.push(data);
        }
        state.toast = true;
      } else {
        state.toast = { ...payload, trigger: true };
      }
    },

    // Delete Movie
    [deleteMovie.pending]: (state) => {
      state.loading = true;
    },
    [deleteMovie.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },

    // =======================================================bookings
    // Get Booking
    [getBookings.pending]: (state) => {
      state.loading = true;
    },
    [getBookings.rejected]: (state) => {
      state.loading = false;
    },
    [getBookings.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.status) {
        state.bookings = payload.data;
      }
    },
    // Create new Booking
    [createBooking.pending]: (state) => {
      state.loading = true;
    },
    [createBooking.rejected]: (state, { payload }) => {
      state.loading = false;
      state.toast = { ...payload, trigger: true };
    },
    [createBooking.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.status) {
        const { data } = payload;
        let bookings = state.bookings;
        if (payload.edited) {
          state.bookings = current(bookings).map((x) => {
            if (x.id === data.id) {
              x = data;
            }
            return x;
          });
        } else {
          bookings.push(data);
        }
        state.toast = true;
      } else {
        state.toast = { ...payload, trigger: true };
      }
    },
    // Delete Booking
    [deleteBooking.pending]: (state) => {
      state.loading = true;
    },
    [deleteBooking.rejected]: (state) => {
      state.loading = false;
    },
    [deleteBooking.fulfilled]: (state, { payload }) => {
      state.loading = false;
    },

    // Get Frontend Shows
    [getShows.pending]: (state) => {
      state.loading = true;
    },
    [getShows.rejected]: (state) => {
      state.loading = false;
    },
    [getShows.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.status) {
        state.booked = payload.data;
      }
    },
  },
});

export default showSlice.reducer;
export const { resetToast, editSlice } = showSlice.actions;
