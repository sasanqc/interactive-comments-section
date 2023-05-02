import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { updateMe } from "../store/auth-slice";
import { uiActions } from "../store/ui-slice";
const Profile = () => {
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const usernameRef = useRef(null);
  const imgRef = useRef();
  const user = useSelector((state) => state.auth.userInfo);
  const handleFileChange = (e) => {
    if (e.target.files) {
      const [file] = e.target.files;
      setSelectedFile(file);
      imgRef.current.src = URL.createObjectURL(file);
    }
  };

  const handleLoadAvatar = (e) => {
    imgRef.current.src = URL.createObjectURL(selectedFile);
  };

  const handleUploadClick = (e) => {
    e.preventDefault();
    if (!usernameRef.current.value) {
      dispatch(
        uiActions.addNotif({
          title: "please fill the username field",
          id: uuid(),
        })
      );
      return;
    }
    dispatch(updateMe({ username: usernameRef.current.value, selectedFile }));
  };

  return (
    <main className="profile">
      <form className="form">
        <h1 className="heading-l">Edit your profile</h1>
        <label className="text-input">
          <p className="heading-m">Username</p>
          <input
            type="email"
            name="email"
            placeholder="Username"
            defaultValue={user.username || ""}
            required
            ref={usernameRef}
          />
        </label>
        <div className="profile__upload gap-s">
          <div className="profile__thumbnail">
            <img
              src={`./images/avatars/${user.image?.png}`}
              className="portrait"
              alt="profile"
              ref={imgRef}
              onError={handleLoadAvatar}
            />
          </div>
          <label className="file-input" htmlFor="photo">
            Change profile photo
            <input
              type="file"
              id="photo"
              accept="image/*"
              name="photo"
              onChange={handleFileChange}
            />
          </label>
        </div>
        <div className="btn-container">
          <button className="btn btn--fill-blue" onClick={handleUploadClick}>
            Upload
          </button>
        </div>
      </form>
    </main>
  );
};

export default Profile;
