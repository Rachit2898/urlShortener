import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getUrls = createAsyncThunk("urls/getUrls", async () => {
  return fetch(`http://localhost:3001/api/v1/getAllUrls`).then((res) =>
    res.json()
  );
});

export const getClicks = createAsyncThunk(
  "click/getClick",
  async ({ data }) => {
    return fetch(`http://localhost:3001/api/v1/clicks`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ url: data }),
    }).then((res) => res.json());
  }
);

export const createUrls = createAsyncThunk("url/createUrls", async (values) => {
  return fetch(`http://localhost:3001/api/v1/createUrl`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(values),
  }).then((res) => res.json());
});

const UrlSlice = createSlice({
  name: "url",
  initialState: {
    loading: false,
    urls: [],
    clicks: [
      {
        response: {
          clicks: 0,
        },
      },
    ],
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
      state.error = action.payload;
    },
    [getClicks.pending]: (state, action) => {
      state.loading = true;
    },
    [getClicks.fulfilled]: (state, action) => {
      state.loading = false;
      state.clicks = [action.payload];
    },
    [getClicks.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export default UrlSlice.reducer;
