import React, { useState, useEffect } from 'react';
import Wrapper from './acstyle';
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import axios from 'axios';
import studentIcon from '../assets/Student.avif'
const StudentList = ({student, handleOnBack, acScoreList}) => {
  // const [profile] = useState({
  //   name: 'John Doe',
  //   studentId: '1234567',
  //   subject: 'Computer Science',
  //   //profilePic: 'https://i.pravatar.cc/150',
  // });
  // const [scores] = useState([
  //   { ac: 'AC1', score: 90 },
  //   { ac: 'AC2', score: 85 },
  //   { ac: 'AC3', score: 95 },
  //   { ac: 'AC4', score: 90 },
  //   { ac: 'AC5', score: 85 },
  //   { ac: 'AC6', score: 95 },
  //   { ac: 'AC7', score: 90 },
  //   { ac: 'AC8', score: 85 },
  //   { ac: 'AC9', score: 95 },
  //   { ac: 'AC10', score: 90 },
  //   { ac: 'AC11', score: 85 },
  //   { ac: 'AC12', score: 95 },
  // ]);
  const [userData, setUserData] = useState(null);
    useEffect(() => {
      const userData = sessionStorage.getItem("userData");
      if (userData) {
        setUserData(JSON.parse(userData));
      }
    }, []);
    console.log("Student Data:", student);
    console.log("User Data:", userData);
  return (
    <Wrapper>
      <div className="AppContainer">
      <div className="Header">
              <FaArrowLeft className="back-icon" onClick={handleOnBack}/>
                <span className="name">AC Scores</span>
              </div>
        <div className="container">
        <div className="ContentContainer">
          <div className="ProfileCard">
            <img className="ProfilePic" src={studentIcon} alt="Profile" />
            <div className="ProfileInfo">
              <div className="ProfileRow">
                <span className="Label">Name:</span>
                <span className="Value">{student.name}</span>
              </div>
              <div className="ProfileRow">
                <span className="Label">Roll No.:</span>
                <span className="Value">{student.id}</span>
              </div>
              <div className="ProfileRow">
                <span className="Label">Subject:</span>
                <span className="Value">{student.subject}</span>
              </div>
            </div>
          </div>
          <div className="TableContainer">
            <table className="ScoresTable">
              <thead>
                <tr>
                  <th className="TableHeaderCell">AC</th>
                  <th className="TableHeaderCell">Score</th>
                </tr>
              </thead>
              <tbody>
                {acScoreList.map((item, index) => (
                  <tr key={index}>
                    <td className="TableDataCell">{item.ac_id}</td>
                    <td className="TableDataCell">{item.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </Wrapper>
  )
}
export default StudentList