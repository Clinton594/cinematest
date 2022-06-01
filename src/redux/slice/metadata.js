import { createSlice } from "@reduxjs/toolkit";
import defaultMetadata from "../../constants/defaultMetaData";

const metadata = createSlice({
  name: "metadata",
  initialState: defaultMetadata,
  extraReducers: {},
});

export default metadata.reducer;
