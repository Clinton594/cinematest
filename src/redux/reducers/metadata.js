import $ from "jquery";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import defaultMetadata from "../../constants/defaultMetaData";
import route from "../../constants/routes";

export const getMetadata = createAsyncThunk("metadata/getMetadata", async () => {
  return await $.get(`${route.api}meta-data`);
});

const metadataSlice = createSlice({
  name: "metadata",
  initialState: defaultMetadata,
  extraReducers: {
    [getMetadata.fulfilled]: (state, { payload: { data } }) => {
      state.loading = false;
      state.locations = data.locations;
      state.genre = data.genre;
      state.languages = data.languages;
    },
  },
});

export default metadataSlice.reducer;
