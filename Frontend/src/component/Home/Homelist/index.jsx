import React, { useState, useEffect } from 'react';
import Wrapper from './style';
import notification from "./bell.png";
import student from './user.png';
import menu from "./menu.png";

const HomeList = ({ teacher, setIndex, msg }) => {
  console.log(teacher)
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const clearSessionStorageOnRefresh = () => {
      sessionStorage.clear();
    };
    window.addEventListener("beforeunload", clearSessionStorageOnRefresh);
    return () => {
      window.removeEventListener("beforeunload", clearSessionStorageOnRefresh);
    };
  }, []);

  const [selectedYear, setSelectedYear] = useState(sessionStorage.getItem("year") || '');
  const [selectedClass, setSelectedClass] = useState(sessionStorage.getItem("class") || '');
  const [selectedSection, setSelectedSection] = useState(sessionStorage.getItem("section") || '');
  const [selectedQuarter, setSelectedQuarter] = useState(sessionStorage.getItem("quarter") || '');
  const [selectedSubject, setSelectedSubject] = useState(sessionStorage.getItem("subject") || '');

  const updateSessionStorage = (key, value, setter) => {
    sessionStorage.setItem(key, value);
    setter(value);
  };

  const handleClick = () => {
    console.log(2)
    setIndex(2)
    console.log(2)
    const updatedUserdata = {
      year: parseInt(selectedYear, 10),
      class: parseInt(selectedClass, 10),
      section: selectedSection,
      quarter: parseInt(selectedQuarter, 10),
      subject: parseInt(selectedSubject, 10),
    };
    sessionStorage.setItem("userData", JSON.stringify(updatedUserdata));
    setUserData(updatedUserdata);

  };

  return (
    <Wrapper>
      <div id="user">
        <div id="detail">
          <p id="hi">Hi ,</p>
          <h1 id="name">{teacher.name}</h1>
        </div>
        <div id="image">
          <img id="notification" src={notification} alt="Notification" />
          <img id="profile" src={student} alt="User" />
          <img id="menu" src={menu} alt="Menu" />
        </div>
      </div>
      <form className="choice">
        <label htmlFor="year">Year</label>
        <select
          id="year"
          value={selectedYear}
          onChange={(e) => updateSessionStorage("year", e.target.value, setSelectedYear)}
        >
          <option value="" disabled>-- Select year --</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
        </select>
        <label htmlFor="class">Class</label>
        <select
          id="class"
          value={selectedClass}
          onChange={(e) => updateSessionStorage("class", e.target.value, setSelectedClass)}
          disabled={!selectedYear}
        >
          <option value="" disabled>-- Select class --</option>
          <option value="1">I</option>
          <option value="2">II</option>
          <option value="3">III</option>
          <option value="4">IV</option>
          <option value="5">V</option>
          <option value="6">VI</option>
          <option value="7">VII</option>
          <option value="8">VIII</option>
          <option value="9">IX</option>
          <option value="10">X</option>
        </select>
        <label htmlFor="section">Section</label>
        <select
          id="section"
          value={selectedSection}
          onChange={(e) => updateSessionStorage("section", e.target.value, setSelectedSection)}
          disabled={!selectedClass}
        >
          <option value="" disabled>-- Select section --</option>
          <option value="Orchid">Orchid</option>
          <option value="Tulip">Tulip</option>
          <option value="Daffodil">Daffodil</option>
        </select>
        <label htmlFor="quarter">Quarter</label>
        <select
          id="quarter"
          value={selectedQuarter}
          onChange={(e) => updateSessionStorage("quarter", e.target.value, setSelectedQuarter)}
          disabled={!selectedSection}
        >
          <option value="" disabled>-- Select quarter --</option>
          <option value="1">I</option>
          <option value="2">II</option>
          <option value="3">III</option>
          <option value="4">IV</option>
        </select>
        <label htmlFor="subject">Subject</label>
        <select
          id="subject"
          value={selectedSubject}
          onChange={(e) => updateSessionStorage("subject", e.target.value, setSelectedSubject)}
          disabled={!selectedQuarter}
        >
          <option value="" disabled>-- Select subject --</option>
          <option value="1">English</option>
          <option value="2">Hindi</option>
          <option value="3">Mathematics</option>
          <option value="4">Science</option>
          <option value="5">Computer Sc.</option>
          <option value="6">Social Studies</option>
          <option value="7">III Language</option>
          <option value="8">GP Values</option>
          <option value="9">Music</option>
          <option value="10">Dance/Dramatics</option>
          <option value="11">Art</option>
          <option value="12">Sports</option>
          <option value="13">Discipline</option>
          <option value="14">Attendance</option>
        </select>
        <button
          id="submit"
          onClick={(e) => {
            e.preventDefault();
            handleClick();
          }}
          disabled={!selectedSubject}
        >
          Next
        </button>
      </form>
    </Wrapper>
  );
};

export default HomeList;