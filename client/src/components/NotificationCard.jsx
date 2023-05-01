import React from "react";
import { useDispatch } from "react-redux";
import { uiActions } from "../store/ui-slice";

const NotificationCard = ({ notif }) => {
  const dispatch = useDispatch();
  const handleAnimationEnd = (e) => {
    dispatch(uiActions.removeNotif(notif.id));
  };
  return (
    <li className="notification-card" key={notif.id}>
      <div className="notification-card__content">
        <h1 className="heading-m">{notif.title}</h1>
      </div>

      <div
        className="notification-card__border"
        onAnimationEnd={handleAnimationEnd}
      ></div>
    </li>
  );
};

export default NotificationCard;
