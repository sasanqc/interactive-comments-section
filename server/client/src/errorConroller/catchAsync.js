import { uiActions } from "../store/ui-slice";
import { v4 as uuid } from "uuid";
export const catchAsync = (fn) => {
  return (dispatch) => {
    fn(dispatch).catch((error) => {
      dispatch(uiActions.addNotif({ title: error.message, id: uuid() }));
    });
  };
};
