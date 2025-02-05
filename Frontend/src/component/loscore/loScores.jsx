import React, { useState, useEffect} from 'react';
import Wrapper from './lostyle';
import { FaArrowLeft, FaEdit } from "react-icons/fa";
// import bellIcon from '../assets/bell.png';
// import userIcon from '../assets/user.png';
import axios from 'axios';
import studentIcon from '../assets/Student.avif'
const StudentList = ({student, handleOnBack, loScoreList}) => {
  // const [profile] = useState({
  //   name: 'John Doe',
  //   studentId: '1234567',
  //   subject: 'Computer Science',
  //   //profilePic: 'https://i.pravatar.cc/150',
  // });
  // const [scores] = useState([
  //   { lo: 'LO1', score: 90 },
  //   { lo: 'LO2', score: 85 },
  //   { lo: 'LO3', score: 95 },
  //   { lo: 'LO4', score: 90 },
  //   { lo: 'LO5', score: 85 },
  //   { lo: 'LO6', score: 95 },
  //   { lo: 'LO7', score: 90 },
  //   { lo: 'LO8', score: 85 },
  //   { lo: 'LO9', score: 95 },
  //   { lo: 'LO10', score: 90 },
  //   { lo: 'LO11', score: 85 },
  //   { lo: 'LO12', score: 95 },
  // ]);
  const [userData, setUserData] = useState(null);
    useEffect(() => {
      const userData = sessionStorage.getItem("userData");
      if (userData) {
        setUserData(JSON.parse(userData));
      }
    }, []);
    // console.log("Student Data:", student);
    // console.log("User Data:", userData);
  return (
    <Wrapper>
      <div className="AppContainer">
      <div className="Header">
              <FaArrowLeft className="back-icon" onClick={handleOnBack}/>
                <span className="name">LO Scores</span>
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
                  <th className="TableHeaderCell">LO</th>
                  <th className="TableHeaderCell">Score</th>
                </tr>
              </thead>
              <tbody>
                {loScoreList.map((item, index) => (
                  <tr key={index}>
                    <td className="TableDataCell">{item.lo_id}</td>
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