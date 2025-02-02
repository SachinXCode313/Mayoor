import React, { useState } from 'react';
import Wrapper from './lostyle';
import bellIcon from '../assets/bell.png';  
import userIcon from '../assets/user.png';

const StudentList = () => {
  const [profile] = useState({
    name: 'John Doe',
    studentId: '1234567',
    subject: 'Computer Science',
    profilePic: 'https://i.pravatar.cc/150',
  });

  const [scores] = useState([
    { lo: 'LO1', score: 90 },
    { lo: 'LO2', score: 85 },
    { lo: 'LO3', score: 95 },
    { lo: 'LO4', score: 90 },
    { lo: 'LO5', score: 85 },
    { lo: 'LO6', score: 95 },
    { lo: 'LO7', score: 90 },
    { lo: 'LO8', score: 85 },
    { lo: 'LO9', score: 95 },
    { lo: 'LO10', score: 90 },
    { lo: 'LO11', score: 85 },
    { lo: 'LO12', score: 95 },
  ]);

  return (
    <Wrapper>
      <div className="AppContainer">
      <div className="Header"> 
          <span>LO Scores</span>  
          
        </div> 
        <div className="container">
        <div className="ContentContainer">
          <div className="ProfileCard">
            <img className="ProfilePic" src={profile.profilePic} alt="Profile" />
            <div className="ProfileInfo">
              <div className="ProfileRow">
                <span className="Label">Name:</span>
                <span className="Value">{profile.name}</span>
              </div>
              <div className="ProfileRow">
                <span className="Label">Student ID:</span>
                <span className="Value">{profile.studentId}</span>
              </div>
              <div className="ProfileRow">
                <span className="Label">Subject:</span>
                <span className="Value">{profile.subject}</span>
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
                {scores.map((item, index) => (
                  <tr key={index}>
                    <td className="TableDataCell">{item.lo}</td>
                    <td className="TableDataCell">{item.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </Wrapper>
  );
};

export default StudentList;