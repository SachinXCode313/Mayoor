import React, { useState , useEffect} from 'react';
import Wrapper from './rostyle';
import axios from 'axios';
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import studentIcon from '../assets/Student.avif'
// import bellIcon from './bell.png';
// import userIcon from './user.png';
const StudentList = ({student, handleOnBack, roScoreList}) => {
  // const [profile] = useState({
  //   name: 'John Doe',
  //   studentId: '1234567',
  //  subject: 'Computer Science',
  //   //  profilePic: 'https://i.pravatar.cc/150',
  // })
  // const [scores] = useState([
  //   { ro: 'RO1', score: 90 },
  //   { ro: 'RO2', score: 85 },
  //   { ro: 'RO3', score: 95 },
  //   { ro: 'RO4', score: 90 },
  //   { ro: 'RO5', score: 85 },
  //   { ro: 'RO6', score: 95 },
  //   { ro: 'RO7', score: 90 },
  //   { ro: 'RO8', score: 85 },
  // ])
  const [userData, setUserData] = useState(null);
    useEffect(() => {
      const userData = sessionStorage.getItem("userData");
      if (userData) {
        setUserData(JSON.parse(userData))
      }
    }, [])
    // console.log("Student Data:", student)
    // console.log("User Data:", userData)
  return (
    <Wrapper>
      <div className="AppContainer">
      <div className="Header">
        <FaArrowLeft className="back-icon" onClick={handleOnBack}/>
          <span className="name">RO Scores</span>
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
                <span className="Label">Student ID:</span>
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
  )
}
export default StudentList