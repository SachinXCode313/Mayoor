import React, { useState, useEffect } from "react";
import styles from "./StudentSelectStyles"; // Importing styles
import bellIcon from "../assets/bell.png";
import userIcon from "../assets/user.png";
import { IoSearchOutline } from "react-icons/io5";
import axios from "axios";
import StudentReport from "../Student_report/StudentReport.jsx";
import TeacherProfile from "../TeacherProfile/index.jsx";
import Menu from "../MenuBar/index.jsx";

const StudentList = ({ onStudentsData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const [showReport, setShowReport] = useState(null);
  const [showTeacherProfile, setShowTeacherProfile] = useState(false);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  
  const handleProfileClick = () => alert("Go to Profile");
  const handleSettingsClick = () => alert("Open Settings");
  const handleLogoutClick = () => alert("Logging Out...");
 
  const handleReport = (student) => {
    setShowReport(student);
  };

  const handleProfile = () => {
    setShowTeacherProfile(true);
  };

  const handleBackToList1 = () => {
    setShowReport(null);
  };

  const handleBackToList2 = () => {
    setShowTeacherProfile(false);
  };

  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setFilteredStudents(
        students.filter((student) =>
          student.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 300);

    return () => clearTimeout(handler);
  }, [searchTerm, students]);

  useEffect(() => {
    const loadStudents = async () => {
      if (!userData || students.length > 0) return;

      try {
        const headers = {
          Authorization: "Bearer YOUR_ACCESS_TOKEN",
          "Content-Type": "application/json",
          year: userData?.year,
          classname: userData?.class,
          section: userData?.section,
          subject: userData?.subject,
        };

        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/students`,
          { headers }
        );

        let re = /(\b[a-z](?!\s))/g;
        response.data.students.map(
          (student) =>
            (student.name = student.name
              .toLowerCase()
              .replace(re, (x) => x.toUpperCase()))
        );

        if (response.data && Array.isArray(response.data.students)) {
          setStudents(response.data.students);
          onStudentsData(response.data.students);
        } else {
          console.warn("Expected an array but received:", response.data);
          setStudents([]);
        }
      } catch (error) {
        console.error("Error fetching students:", error.response || error.message);
        setStudents([]);
      }
    };

    if (userData && Object.keys(userData).length > 0 && students.length === 0) {
      loadStudents();
    }
  }, [userData]);

  if (showReport) {
    return <StudentReport student={showReport} onBack={handleBackToList1} />;
  }

  if (showTeacherProfile) {
    return <TeacherProfile onBack={handleBackToList2} />;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
      {/* <div className="icon"> */}
          <Menu
            onProfileClick={handleProfileClick}
            onSettingsClick={handleSettingsClick}
            onLogoutClick={handleLogoutClick}
          />
        {/* </div> */}
        <div style={styles.searchContainer}>
          <div
            style={{
              ...styles.searchBox,
              backgroundColor: isFocused ? "white" : "rgba(255, 255, 255, 0.6)",
            }}
          >
            <input
              type="text"
              placeholder="Search"
              style={styles.searchInput}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
            />
            <IoSearchOutline style={styles.searchIcon} />
          </div>
        </div>
      </div>

      {/* Student List */}
      <div className="studentlist" style={{ width: "100%" }}>
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student, index) => (
            <div
              key={index}
              className="student-item"
              style={styles.studentItem}
              onClick={() => handleReport(student)}
            >
              <div className="student-avatar" style={styles.studentAvatar}>
                {student.name
                  .split(" ")
                  .slice(0, 2)
                  .map((word) => word[0].toUpperCase())
                  .join("")}
              </div>
              <div className="student-name" style={styles.studentName}>{student.name}</div>
            </div>
          ))
        ) : (
          <div style={styles.noResults}>No students found</div>
        )}
      </div>
    </div>
  );
};

export default StudentList;