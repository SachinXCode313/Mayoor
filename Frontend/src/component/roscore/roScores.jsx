import React, { useState , useEffect} from 'react';
import Wrapper from './rostyle';
import axios from 'axios';
// import bellIcon from './bell.png';  
// import userIcon from './user.png';

const StudentList = ({student}) => {
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
  const [roScoreList, setRoScoreList] = useState([]); 
  const [filteredRoScoreList, setFilteredRoScoreList] = useState([]); 

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
      const loadRoScore = async (userdata) => {
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
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/report-outcome-score`, { headers });
          const data = response.data;
  
          console.log('Response Data:', data);
  
          if (data && Array.isArray(data.ro_scores)) {
            setRoScoreList(data.ro_scores);
            setFilteredRoScoreList(data.ro_scores); // Initialize filtered list with full data
          } else {
            console.warn('Expected an array but received:', data);
            setRoScoreList([]);
            setFilteredRoScoreList([]);
          }
        } catch (error) {
          console.error('Error fetching report outcomes:', error.response || error.message);
          setRoScoreList([]);
          setFilteredRoScoreList([]);
        }
      };
  
      if (userData && Object.keys(userData).length > 0) {
        loadRoScore(userData);
      }
    }, [userData]);
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
                  <th className="TableHeaderCell">RO</th>
                  <th className="TableHeaderCell">Score</th>
                </tr>
              </thead>
              <tbody>
                {roScoreList.map((item, index) => (
                  <tr key={index}>
                    <td className="TableDataCell">{item.ro_id}</td>
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
  );
};

export default StudentList;