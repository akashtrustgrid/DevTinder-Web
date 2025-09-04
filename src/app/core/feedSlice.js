import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeeds: (state, action) => {
      // Replace entire feeds array
      return action.payload;
    },
    removeFeed: (state, action) => {
      // Remove feed by ID (pass ID as action.payload)
      return state.filter((feed) => feed._id !== action.payload);
    },
  },
});

export const { addFeeds, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
