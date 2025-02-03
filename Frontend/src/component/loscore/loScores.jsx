import React, { useState, useEffect} from 'react';
import Wrapper from './lostyle';
import bellIcon from '../assets/bell.png';  
import userIcon from '../assets/user.png';
import axios from 'axios';

const StudentList = (student) => {
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

  const [loScoreList, setLoScoreList] = useState([]); 
  const [filteredLoScoreList, setFilteredLoScoreList] = useState([]); 

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
      const loadLoScore = async (userdata) => {
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
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/learning-outcome-score`, { headers });
          const data = response.data;
  
          console.log('Response Data:', data);
  
          if (data && Array.isArray(data.ro)) {
            setLoScoreList(data.ro);
            setFilteredLoScoreList(data.ro); // Initialize filtered list with full data
          } else {
            console.warn('Expected an array but received:', data);
            setLoScoreList([]);
            setFilteredLoScoreList([]);
          }
        } catch (error) {
          console.error('Error fetching report outcomes:', error.response || error.message);
          setLoScoreList([]);
          setFilteredLoScoreList([]);
        }
      };
  
      if (userData && Object.keys(userData).length > 0) {
        loadLoScore(userData);
      }
    }, [userData]);
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