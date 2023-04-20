import { createSlice } from "@reduxjs/toolkit";
import * as api from "../lib/api";
const commentSlice = createSlice({
  name: "comment",
  initialState: { items: [], status: null },
  reducers: {
    addToComments(state, action) {
      state.items.push(action.payload);
    },
    deleteComment(state, action) {
      const index = state.items.findIndex((i) => {
        return i.id === action.payload;
      });
      if (index >= 0) {
        state.items.splice(index, 1);
      }
    },
    setComments(state, action) {
      state.items = action.payload.items;
      state.status = action.payload.status;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    updateComment(state, action) {
      const index = state.items.findIndex((i) => {
        return i.id === action.payload.id;
      });

      if (index >= 0) {
        state.items[index] = action.payload;
      }
    },
  },
});

export const getAllComments = () => {
  return async (dispatch) => {
    try {
      dispatch(commentActions.setStatus("PENDING"));
      const response = await api.getAllComments();
      dispatch(
        commentActions.setComments({ items: response, status: "SUCCESS" })
      );
    } catch (error) {
      dispatch(commentActions.setStatus("ERROR"));
    }
  };
};

export const deleteComment = (commentId) => {
  return async (dispatch) => {
    try {
      await api.deleteComment(commentId);
      dispatch(commentActions.deleteComment(commentId));
    } catch (error) {
      dispatch(commentActions.setStatus("ERROR"));
    }
  };
};

export const voteComment = (commentId, score) => {
  return async (dispatch) => {
    try {
      const updatedComment = await api.updateComment(commentId, { score });
      dispatch(commentActions.updateComment(updatedComment));
    } catch (error) {
      dispatch(commentActions.setStatus("ERROR"));
    }
  };
};

export const commentActions = commentSlice.actions;

export default commentSlice;
