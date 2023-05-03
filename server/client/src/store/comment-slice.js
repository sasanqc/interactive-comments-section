import { createSlice } from "@reduxjs/toolkit";
import * as api from "../lib/api";
import { catchAsync } from "../errorConroller/catchAsync";
import { uiActions } from "./ui-slice";
import { v4 as uuid } from "uuid";
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
  return catchAsync(async (dispatch) => {
    try {
      const { comments } = await api.getAllComments();
      dispatch(
        commentActions.setComments({ items: comments, status: "SUCCESS" })
      );
    } catch (error) {}
  });
};

export const deleteComment = (commentId) => {
  return catchAsync(async (dispatch) => {
    await api.deleteComment(commentId);
    dispatch(commentActions.deleteComment(commentId));
    dispatch(uiActions.addNotif({ title: "Deleted Successfully", id: uuid() }));
  });
};

export const updateComment = (commentId, comment) => {
  return catchAsync(async (dispatch) => {
    const { data: updatedComment } = await api.updateComment(
      commentId,
      comment
    );
    dispatch(commentActions.updateComment(updatedComment));
    dispatch(uiActions.setCommentState({ operation: null, id: null }));
  });
};

export const addComment = (content) => {
  return async (dispatch, getState) => {
    const user = getState().auth.userInfo;
    const { data } = await api.createComment({
      content,
      user: user._id,
    });

    dispatch(
      commentActions.addToComments({
        ...data.data,
        user,
      })
    );
  };
};

export const replyComment = (replyingTo, content) => {
  return async (dispatch, getState) => {
    const user = getState().auth.userInfo;
    const { data } = await api.createComment({
      content,
      replyingTo,
      user: user._id,
    });
    data.data.user = user;
    dispatch(commentActions.addReplyToComment(data.data));
    dispatch(uiActions.setCommentState({ operation: null, id: null }));
  };
};
export const commentActions = commentSlice.actions;

export default commentSlice;
