import React, { useState } from "react";
import Wrapper from "./style";

const TeacherProfile = () => {
  const [username, setUsername] = useState("Lady Gaga");
  const [email] = useState("ladygaga@gmail.com"); // Fixed email

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <Wrapper>
    <div className="container">
      <div className="header">
        <button className="btn" id="backBtn">&lt;</button>
        <h1>Edit Profile</h1>
        <button className="btn" id="notificationBtn">
          <i>&#xf0f3;</i>
        </button>
      </div>

      <div className="profile-section">
        <div className="avatar-container">
          <img src="teacher.png" id="teacher-img" alt="Teacher" />
          <div className="user-details">
            <h2 className="username">{username}</h2>
            <p className="userId">12345</p>
          </div>
        </div>

        <div className="form-container">
          <label className="form-criteria" htmlFor="form-username">Username</label>
          <input 
            type="text" 
            className="form-input" 
            id="form-username" 
            value={username} 
            onChange={handleUsernameChange} 
          />
          <label className="form-criteria" htmlFor="form-mail">Email Id</label>
          <input 
            type="text" 
            className="form-input" 
            id="form-mail" 
            value={email} 
            readOnly 
          />
          <label className="form-criteria" htmlFor="form-class">Class</label>
          <select className="form-input dropdown" id="form-class">
            <option>Class 3</option>
            <option>Class 4</option>
            <option>Class 5</option>
          </select>
          <button id="save-button">Save Changes</button>
        </div>
      </div>
    </div>
    </Wrapper>
  );
};

export default TeacherProfile;