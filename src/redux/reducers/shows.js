import $ from "jquery";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import defaultShows from "../../constants/defaultShow";
import route from "../../constants/routes";

export const getMovies = createAsyncThunk("show/getMovies", async () => {
  return await $.get(`${route.api}movies`);
});

export const createMovie = createAsyncThunk("show/createMovie", async (data) => {
  return await $.post(`${route.api}create-movie`, data);
});

export const updateMovie = createAsyncThunk("show/updateMovie", async (data) => {
  return await $.post(`${route.api}update-movie`, data);
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

export const updateBooking = createAsyncThunk("show/updateBooking", async (data) => {
  return await $.post(`${route.api}update-booking`, data);
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
        let movies = state.movies;
        movies.push(payload.data);
        state.toast = true;
      } else {
        state.toast = { ...payload, trigger: true };
      }
    },
    // Update movie
    [updateMovie.pending]: (state) => {
      state.loading = true;
    },
    [updateMovie.fulfilled]: (state, { payload }) => {
      state.loading = false;
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
        let bookings = state.bookings;
        bookings.push(payload.data);
        state.toast = true;
      } else {
        state.toast = { ...payload, trigger: true };
      }
    },
    // Update Booking
    [updateBooking.pending]: (state) => {
      state.loading = true;
    },
    [updateBooking.rejected]: (state) => {
      state.loading = false;
    },
    [updateBooking.fulfilled]: (state, { payload }) => {
      state.loading = false;
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
export const { resetToast } = showSlice.actions;
