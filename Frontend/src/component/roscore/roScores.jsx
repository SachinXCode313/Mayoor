import React, { useState } from 'react';
import Wrapper from './rostyle';
// import bellIcon from './bell.png';  
// import userIcon from './user.png';

const StudentList = () => {
  const [profile] = useState({
    name: 'John Doe',
    studentId: '1234567',
   subject: 'Computer Science',
    profilePic: 'https://i.pravatar.cc/150',
  });

  const [scores] = useState([
    { ro: 'RO1', score: 90 },
    { ro: 'RO2', score: 85 },
    { ro: 'RO3', score: 95 },
    { ro: 'RO4', score: 90 },
    { ro: 'RO5', score: 85 },
    { ro: 'RO6', score: 95 },
    { ro: 'RO7', score: 90 },
    { ro: 'RO8', score: 85 },
  
  ]);

  return (
    <Wrapper>
      <div className="AppContainer">
      <div className="Header"> 
          <span>RO Scores</span>   
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
                  <th className="TableHeaderCell">RO</th>
                  <th className="TableHeaderCell">Score</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((item, index) => (
                  <tr key={index}>
                    <td className="TableDataCell">{item.ro}</td>
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