import { createSlice } from "@reduxjs/toolkit";
const uiSlice = createSlice({
  name: "ui",
  initialState: {
    notifs: [],
    commentState: { operation: null, id: null },
  },
  reducers: {
    addNotif(state, action) {
      state.notifs.push(action.payload);
    },
    removeNotif(state, action) {
      state.notifs = state.notifs.filter((el) => el.id !== action.payload);
    },
    setCommentState(state, action) {
      state.commentState = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
