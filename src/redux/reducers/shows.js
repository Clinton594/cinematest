import $ from "jquery";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import defaultShows from "../../constants/defaultMovies";
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

const showSlice = createSlice({
  name: "show",
  initialState: defaultShows,
  reducers: {},
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
      state.status = payload;
    },
    [createMovie.fulfilled]: (state, { payload }) => {
      state.loading = false;
      if (payload.status) {
        let movies = state.movies;
        movies.push(payload.data);
        state.status = true;
      } else {
        state.status = payload;
      }
    },
    // Update movie
    [updateMovie.pending]: (state) => {},
    [updateMovie.fulfilled]: (state, { payload }) => {},
    // Delete Movie
    [deleteMovie.pending]: (state) => {},
    [deleteMovie.fulfilled]: (state, { payload }) => {},
  },
});

export default showSlice.reducer;
