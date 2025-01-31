import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import { FaArrowLeft } from "react-icons/fa";
import Student from '../Start_Assesment/Student.avif';
const Assessment = ({ selectedAssessment, onBack }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [acData, setAcData] = useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem("assessmentData");
    if (storedData) {
      setAcData(JSON.parse(storedData));
    } else {
      generateAcData();
    }
  }, []);
  useEffect(() => {
    if (acData.length > 0) {
      localStorage.setItem("assessmentData", JSON.stringify(acData));
    }
  }, [acData]);
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const generateAcData = () => {
    let data = [];
    for (let i = 1; i <= 100; i++) {
      data.push({ id: i, acName: `Student-${i}`, marks: '' });
    }
    setAcData(data);
  };
  const handleMarksChange = (e, id) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      const updatedData = [...acData];
      updatedData[id - 1].marks = value;
      setAcData(updatedData);
    }
  };
  return (
    <Wrapper>
      <div className="profile-section">
        <div className="search-container">
          <button className="back-button" onClick={onBack}>
            <FaArrowLeft />
          </button>
          <input type="text" placeholder="Search..." value={searchQuery} onChange={handleSearchChange} className="search-bar" />
        </div>
        <div className="info-container">
          <h1 className="name">{selectedAssessment ? selectedAssessment.name : "AC-1"}</h1>
          {/* <p className="title">AC Title</p> */}
        </div>
      </div>
      <div className="ac-container">
        {acData.map((ac) => (
          <div className="ac-box" key={ac.id}>
            <img src={Student} alt="Profile" className="profile-image"/>
            <h3>{ac.acName}</h3>
            <p className="roll-number">Roll Number: 12345</p>
            <input
              type="text"
              value={ac.marks}
              onChange={(e) => handleMarksChange(e, ac.id)}
              placeholder="Enter Marks"
              className="marks-input"
            />
          </div>
        ))}
      </div>
      <button className="done-button">Done</button>
    </Wrapper>
  );
};
export default Assessment;