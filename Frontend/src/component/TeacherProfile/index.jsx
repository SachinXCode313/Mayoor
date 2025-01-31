import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineDarkMode } from "react-icons/md";
import styles from "./style";

const TeacherProfile = ({ goBack }) => {
  const [isDarkMode, setIsDarkMode] = useState(false); 
  const [username, setUsername] = useState("John Smith");
  const [editMode, setEditMode] = useState(false); 
  const [tempName, setTempName] = useState(username); 

  const handleToggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleUpdateClick = () => {
    if (editMode) {
      setUsername(tempName); 
    }
    setEditMode(!editMode); 
  };

  return (
    <div style={isDarkMode ? styles.darkContainer : styles.container}>
      {/* Header */}
      <header style={styles.header}>
        <button
          style={styles.backButton}
          onClick={goBack} // Call goBack to return to the previous page
          title="Back to Student List"
        >
          &lt;
        </button>
        <h1 style={styles.title}>Edit My Profile</h1>
        <div
          style={styles.notification}
          onClick={handleToggleDarkMode}
          title="Toggle Dark Mode"
        >
          <MdOutlineDarkMode size={24} />
        </div>
      </header>

      {/* Profile Section */}
      <div style={styles.profileContainer}>
        <FaUserCircle size={80} color={isDarkMode ? "#aaa" : "#555"} />
        <p style={styles.userName}>{username}</p>
        <p style={styles.userId}>ID: 25030024</p>
      </div>

      {/* Account Settings */}
      <div
        style={
          isDarkMode ? styles.darkSettingsContainer : styles.settingsContainer
        }
      >
        <h2 style={styles.settingsTitle}>Account Settings</h2>
        <form style={styles.form}>
          <label style={styles.label}>Username</label>
          {editMode ? (
            <input
              type="text"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
              style={styles.input}
            />
          ) : (
            <input type="text" value={username} style={styles.input} readOnly />
          )}

          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            value="example@example.com"
            style={styles.input}
            readOnly
          />

          <button
            type="button"
            onClick={handleUpdateClick}
            style={styles.updateButton}
          >
            {editMode ? "Save Changes" : "Edit Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TeacherProfile;
