import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import { FaArrowLeft } from "react-icons/fa";
import Student from './Student.avif';
import bellIcon from './bell.png';
import userIcon from './user.png';
import axios from "axios";
import menuIcon from "../assets/menu.png";

const Assessment = ({ selectedAssessment, onBack, studentsData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [acData, setAcData] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Function to handle marks change for each student
  const handleMarksChange = (e, studentId) => {
    const value = e.target.value;
    const updatedStudents = [...studentsData];
    const studentIndex = updatedStudents.findIndex(student => student.id === studentId);

    if (studentIndex !== -1) {
      updatedStudents[studentIndex].marks = value;
      setAcData(updatedStudents);  // Update the state for studentsData (if needed)
    }
  };

  // Function to handle the form submission and sending the scores to the backend
  const handleSubmit = async () => {
    // Prepare payload with student ids and marks
    const payload = studentsData
      .filter(student => student.marks !== '') // Only include students with marks entered
      .map(student => ({
        student_id: student.id,
        obtained_marks: student.marks
      }));

    if (payload.length === 0) {
      alert("No marks entered!");
      return;
    }

    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN", // Replace with actual token
      "Content-Type": "application/json",
      year: userData?.year,
      classname: userData?.class,
      section: userData?.section,
      quarter: userData?.quarter,
      subject: userData?.subject,
    };

    const requestBody = {
      ac_id: selectedAssessment?.id,
      scores: payload,
    };

    console.log("Data being sent to the backend:", requestBody);

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/assessment-criteria-score`, requestBody, { headers });
      console.log("Response from backend:", response.data);
      alert("Marks submitted successfully!");
    } catch (error) {
      console.error("Error submitting marks:", error.response || error.message);
      alert("Failed to submit marks. Please try again.");
    }
  };

  return (
    <Wrapper>
      <div className="profile-section">
        <div className="search-container">
          <button className="back-button" onClick={onBack}>
            <FaArrowLeft />
          </button>
          <input
            type="text"
            placeholder="Search RO..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-bar"
          />
          <div className="icon">
            <img src={bellIcon} alt="Bell Icon" style={{ width: "22px", height: "22px" }} />
            <img src={userIcon} alt="User Icon" style={{ width: "22px", height: "22px" }} />
            <img className="menu" src={menuIcon} alt="Menu Icon" style={{ width: "22px", height: "31px" }} />
          </div>
        </div>

        <div className="info-container">
          <h1 className="name">{selectedAssessment ? selectedAssessment.name : "AC-1"}</h1>
        </div>
      </div>

      <div className="ac-container">
        {studentsData.map((stu) => (
          <div className="ac-box" key={stu.id}>
            <img src={Student} alt="Profile" className="profile-image" />
            <h3>{stu.name}</h3>
            <p className="roll-number">Roll Number: {stu.id}</p>
            <input
              type="text"
              value={stu.marks}
              onChange={(e) => handleMarksChange(e, stu.id)}  // Pass student ID to the handler
              placeholder="Enter Marks"
              className="marks-input"
            />
          </div>
        ))}
      </div>

      <input className="done-button" type="button" value="Done" onClick={handleSubmit} />
    </Wrapper>
  );
};

export default Assessment;