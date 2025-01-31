import React, { useState, useEffect } from "react";
import { IoSearchOutline } from "react-icons/io5";
import dropUp from "../assets/dropup-image.png";
import dropDown from "../assets/dropdown-image.png";
import ProfileIcon from "../assets/profile-simple.png";
import NotificationIcon from "../assets/notification.png";
import Assessment from '../Start_Assesment/index.jsx';
import TeacherProfile from "../TeacherProfile/index.jsx";
import styles from "./StudentSelectStyles.js";
import axios from "axios";

const StudentSelect = ({ userData }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);
  const [showTeacherProfile, setShowTeacherProfile] = useState(false);
  const [students, setStudents] = useState([]); // Initialized as an empty array
  const [isLoading, setIsLoading] = useState(true);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const handleStartAssessment = () => {
    setShowAssessment(true);
  };

  const handleTeacherProfile = () => {
    setShowTeacherProfile(true);
  };

  // Updated function using async/await with enhanced logging
  const loadStu = async () => {
    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN", // Replace with the actual token
      "Content-Type": "application/json",
      year: userData.year,
      classname: userData.class,
      section: userData.section,
    };
  
    try {
      const response = await axios.get("http://10.33.0.41:8000/api/students", { headers });
  
      // Check if response.data.Students exists and is an array
      if (response.data && Array.isArray(response.data.Students)) {
        console.log("Students Data:", response.data.Students);
        setStudents(response.data.Students); // Corrected to match the API response structure
      } else {
        console.warn("Students data is missing or not an array:", response.data);
        setStudents([]); // Set to empty array if data is invalid
      }
    } catch (err) {
      // Log the error
      console.error("Error fetching students:", err.response || err.message);
      setStudents([]); // Set to empty array in case of error
    } finally {
      setIsLoading(false); // Set isLoading to false after fetching data
    }
  };
  
  

  useEffect(() => {
    if (Object.keys(userData).length > 0) {
      loadStu();
    }
  }, [userData]);

  if (showAssessment) {
    return <Assessment goBack={() => setShowAssessment(false)} />;
  }
  if (showTeacherProfile) {
    return <TeacherProfile goBack={() => setShowTeacherProfile(false)} />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <div style={styles.greeting}>
            <h2 style={styles.title}>Hi, Ritika</h2>
            <p style={styles.subtitle}>Good Morning</p>
          </div>
          <div style={styles.icons}>
            <img
              src={ProfileIcon}
              alt="Profile"
              style={styles.icon}
              onClick={handleTeacherProfile}
            />
            <img src={NotificationIcon} alt="Notifications" style={styles.icon} />
          </div>
        </div>

        <div
          style={{
            ...styles.searchContainer,
            ...(isFocused
              ? { backgroundColor: "#ffffff", boxShadow: "0 4px 6px rgba(10, 10, 100, 0.1)" }
              : {}),
          }}
        >
          <input
            type="text"
            placeholder="Search"
            style={{
              ...styles.searchInput,
              ...(isFocused ? { width: "100%" } : {}),
            }}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <IoSearchOutline style={styles.searchIcon} />
        </div>
      </div>

      <div style={styles.whiteLayer}>
        <div style={styles.buttonsContainer}>
          <h3 style={styles.sectionTitle}>Student List</h3>
          <button
            style={{
              ...styles.button,
              backgroundColor: isHovered ? "white" : "#3CB3D0",
            }}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            onClick={handleStartAssessment}
          >
            Start Assessment
          </button>
        </div>
        <div style={styles.studentList}>
          {isLoading ? (
            <p>Loading students...</p>
          ) : students.length > 0 ? (
            students.map((student, index) => (
              <div key={index}>
                <div style={styles.studentItem} onClick={() => toggleExpand(index)}>
                  {student.name || `Student ${index + 1}`}
                  {/* <img
                    src={expandedIndex === index ? dropUp : dropDown}
                    alt="arrow"
                    style={styles.arrow}
                  /> */}
                </div>
                {/* {expandedIndex === index && (
                  <div style={styles.studentDetails}>
                    <p>Age: {student.age || "N/A"}</p>
                    <p>Class: {student.class || "N/A"}</p>
                  </div>
                )} */}
              </div>
            ))
          ) : (
            <p>No students available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentSelect;
