import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUrls = createAsyncThunk("urls/getUrls", async () => {
  return fetch(`http://localhost:3001/api/v1/getAllUrls`).then((res) =>
    res.json()
  );
});


export const createUrls = createAsyncThunk("url/createUrls", async (values) => {
  return fetch(`http://localhost:3001/api/v1/createUrl`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((res) => res.json());
});

export const getClicks= createAsyncThunk("url/createUrls", async (values) => {
  console.log("getClicks", values)
  return fetch(`http://localhost:3001/api/v1/shortUrl/${values}`, {
  
  }).then((res) => res.json());
});

const UrlSlice = createSlice({
  name: "url",
  initialState: {
    loading: false,
    urls: [],
    error: false
  },
  extraReducers: {
    [getUrls.pending]: (state, action) => {
      state.loading = true;
    },
    [getUrls.fulfilled]: (state, action) => {
      state.loading = false;
      state.urls = [action.payload];
    },
    [getUrls.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
});
export default UrlSlice.reducer;
