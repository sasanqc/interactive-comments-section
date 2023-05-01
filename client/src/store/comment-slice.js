import { createSlice } from "@reduxjs/toolkit";
import * as api from "../lib/api";

const findAndOperateOnComment = (data, id, payload, fn) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].id === id) {
      fn(data, i, payload);
      return true;
    } else {
      for (let j = 0; j < data[i].replies?.length; j++) {
        if (findAndOperateOnComment(data[i].replies, id, payload, fn)) {
          return true;
        }
      }
    }
  }
};
const commentSlice = createSlice({
  name: "comment",
  initialState: { items: [], status: null },
  reducers: {
    addToComments(state, action) {
      state.items.push(action.payload);
    },
    deleteComment(state, action) {
      findAndOperateOnComment(
        state.items,
        action.payload,
        null,
        (data, index) => data.splice(index, 1)
      );
    },
    setComments(state, action) {
      state.items = action.payload.items;
      state.status = action.payload.status;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    addReplyToComment(state, action) {
      findAndOperateOnComment(
        state.items,
        action.payload.replyingTo,
        action.payload,
        (data, index, payload) => data[index].replies.push(payload)
      );
    },
    updateComment(state, action) {
      findAndOperateOnComment(
        state.items,
        action.payload.id,
        action.payload,
        (data, index, payload) => (data[index] = payload)
      );
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

export const replyComment = (replyingTo, content) => {
  return async (dispatch, getState) => {
    const user = getState().auth.userInfo;
    const data = await api.createComment({
      content,
      replyingTo,
      user: user._id,
    });
    data.user = user;
    dispatch(commentActions.addReplyToComment(data));
  };
};
export const commentActions = commentSlice.actions;

export default commentSlice;
