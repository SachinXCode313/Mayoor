import React, { useState, useEffect } from 'react';
import Wrapper from './acstyle';
import bellIcon from '../assets/bell.png';  
import userIcon from '../assets/user.png';
import axios from 'axios';

const StudentList = ({student}) => {
  const [profile] = useState({
    name: 'John Doe',
    studentId: '1234567',
    subject: 'Computer Science',
    profilePic: 'https://i.pravatar.cc/150',
  });

  const [scores] = useState([
    { ac: 'AC1', score: 90 },
    { ac: 'AC2', score: 85 },
    { ac: 'AC3', score: 95 },
    { ac: 'AC4', score: 90 },
    { ac: 'AC5', score: 85 },
    { ac: 'AC6', score: 95 },
    { ac: 'AC7', score: 90 },
    { ac: 'AC8', score: 85 },
    { ac: 'AC9', score: 95 },
    { ac: 'AC10', score: 90 },
    { ac: 'AC11', score: 85 },
    { ac: 'AC12', score: 95 },
  ]);

  const [acScoreList, setAcScoreList] = useState([]); 
  const [filteredAcScoreList, setFilteredAcScoreList] = useState([]); 

  const [userData, setUserData] = useState(null);
    useEffect(() => {
      const userData = sessionStorage.getItem("userData");
      if (userData) {
        setUserData(JSON.parse(userData));
      }
    }, []);
    console.log("Student Data:", student);
    console.log("User Data:", userData);


    useEffect(() => {
      const loadAcScore = async (userdata) => {
        const headers = {
          Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with actual token
          'Content-Type': 'application/json',
          student_id: student.id,
          year: userdata.year,
          classname: userdata.class,
          section: userdata.section,
          subject: userdata.subject,
        };
        console.log(headers);
        
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/assessment-criteria-score`, { headers });
          const data = response.data;
  
          console.log('Response Data:', data);
  
          if (data && Array.isArray(data.ro)) {
            setAcScoreList(data.ro);
            setFilteredAcScoreList(data.ro); // Initialize filtered list with full data
          } else {
            console.warn('Expected an array but received:', data);
            setAcScoreList([]);
            setFilteredAcScoreList([]);
          }
        } catch (error) {
          console.error('Error fetching report outcomes:', error.response || error.message);
          setAcScoreList([]);
          setFilteredAcScoreList([]);
        }
      };
  
      if (userData && Object.keys(userData).length > 0) {
        loadAcScore(userData);
      }
    }, [userData]);
  return (
    <Wrapper>
      <div className="AppContainer">
      <div className="Header"> 
          <span>AC Scores </span>
          <img className="HeaderImage" src={userIcon} alt="Logouser" />
          <img className="HeaderImage" src={bellIcon} alt="Logonotification" />     
        </div>  
        <div className="container">
        <div className="ContentContainer">
          <div className="ProfileCard">
            <img className="ProfilePic" src={profile.profilePic} alt="Profile" />
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
                <span className="Value">{profile.subject}</span>
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
                {scores.map((item, index) => (
                  <tr key={index}>
                    <td className="TableDataCell">{item.ac}</td>
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