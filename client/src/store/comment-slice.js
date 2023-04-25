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
      const findAndUpdate = (data) => {
        for (let i = 0; i < data.length; i++) {
          if (data[i].id === action.payload.id) {
            data[i] = action.payload;
            return true;
          } else {
            for (let j = 0; j < data[i].replies?.length; j++) {
              if (findAndUpdate(data[i].replies)) {
                return true;
              }
            }
          }
        }
      };

      findAndUpdate(state.items);
    },
  },
});

export const getAllComments = () => {
  return async (dispatch) => {
    try {
      dispatch(commentActions.setStatus("PENDING"));
      const { comments } = await api.getAllComments();
      dispatch(
        commentActions.setComments({ items: comments, status: "SUCCESS" })
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

export const updateComment = (commentId, comment) => {
  return async (dispatch) => {
    try {
      const { data: updatedComment } = await api.updateComment(
        commentId,
        comment
      );
      dispatch(commentActions.updateComment(updatedComment));
    } catch (error) {
      dispatch(commentActions.setStatus("ERROR"));
    }
  };
};

export const addComment = (content) => {
  return async (dispatch, getState) => {
    try {
      const user = getState().auth.userInfo;
      const data = await api.createComment({
        content,
        user: user._id,
      });
      dispatch(
        commentActions.addToComments({
          ...data,
          user,
        })
      );
    } catch (error) {
      dispatch(commentActions.setStatus("ERROR"));
    }
  };
};

export const commentActions = commentSlice.actions;

export default commentSlice;
