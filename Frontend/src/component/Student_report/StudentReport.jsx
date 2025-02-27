import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import profilePic from '../assets/Group 463.png';
import AcScores from '../acscore/acScores';
import LoScores from '../loscore/loScores';
import RoScores from '../roscore/roScores';
import Wrapper from './StudentReport';
import axios from "axios";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
// Registering chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const Student_report = ({ student, onBack, id }) => {
  const [activeComponent, setActiveComponent] = useState(null)
  // const [acScores, setAcScores] = useState([]);
  const [userData, setUserData] = useState(null);
      useEffect(() => {
        const userData = sessionStorage.getItem("userData");
        if (userData) {
          setUserData(JSON.parse(userData));
        }
      }, []);
  const [acScoreList, setAcScoreList] = useState([]);
  const [filteredAcScoreList, setFilteredAcScoreList] = useState([]);
  const [acPer, setAcPer] = useState(0); // Initialize acPer
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
      quarter: userdata.quarter,
    };
    console.log(headers);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/assessment-criteria-score`, { headers });
      const data = response.data;
      console.log('Response Data:', data);
      if (data && Array.isArray(data.ac_scores)) {
        setAcScoreList(data.ac_scores);
        setFilteredAcScoreList(data.ac_scores);
        // :white_tick: Extract and store the average score if available
        if (data.average_score !== undefined) {
          setAcPer(Math.round(data.average_score * 100));
        } else {
          setAcPer(0); // Default to 0 if no value found
        }
      } else {
        console.warn('Expected an array but received:', data);
        setAcScoreList([]);
        setFilteredAcScoreList([]);
        setAcPer(0);
      }
    } catch (error) {
      console.error('Error fetching report outcomes:', error.response || error.message);
      setAcScoreList([]);
      setFilteredAcScoreList([]);
      setAcPer(0);
    }
  };
  if (userData && Object.keys(userData).length > 0) {
    loadAcScore(userData);
  }
}, [userData]);
const [loScoreList, setLoScoreList] = useState([]);
const [filteredLoScoreList, setFilteredLoScoreList] = useState([]);
const [loPer, setLoPer] = useState(0); // Initialize acPer
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
      quarter: userdata.quarter // Use userdata instead of user
    };
    console.log(headers);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/learning-outcome-score`, { headers });
      const data = response.data;
      console.log('Response Data:', data);
      if (data && Array.isArray(data.lo_scores)) {
        setLoScoreList(data.lo_scores);
        setFilteredLoScoreList(data.lo_scores);
        if (data.average_score !== undefined) {
          setLoPer(Math.round(data.average_score * 100));
        } else {
          setLoPer(0); // Default to 0 if no value found
        }
      } else {
        console.warn('Expected an array but received:', data);
        setLoScoreList([]);
        setFilteredLoScoreList([]);
        setLoPer(0)
      }
    } catch (error) {
      console.error('Error fetching lo scores:', error.response || error.message);
      setLoScoreList([]);
      setFilteredLoScoreList([]);
      setLoPer(0)
    }
  };
  if (userData && Object.keys(userData).length > 0) {
    loadLoScore(userData); // Corrected: Pass userData instead of user
  }
}, [userData]);
  const [roScoreList, setRoScoreList] = useState([]);
  const [filteredRoScoreList, setFilteredRoScoreList] = useState([])
  const [roPer, setRoPer] = useState(0); // Initialize acPer
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
    console.log(headers)
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/report-outcome-score`, { headers })
      const data = response.data;
      console.log('Response Data:', data)
      if (data && Array.isArray(data.ro_scores)) {
        setRoScoreList(data.ro_scores);
        setFilteredRoScoreList(data.ro_scores); // Initialize filtered list with full data
        if (data.average_score !== undefined) {
          setRoPer(Math.round(data.average_score * 100));
        } else {
          setRoPer(0); // Default to 0 if no value found
        }
      } else {
        console.warn('Expected an array but received:', data)
        setRoScoreList([])
        setFilteredRoScoreList([])
        setRoPer(0)
      }
    } catch (error) {
      console.error('Error fetching report outcomes:', error.response || error.message);
      setRoScoreList([])
      setFilteredRoScoreList([])
      setRoPer(0)
    }
  }
  if (userData && Object.keys(userData).length > 0) {
    loadRoScore(userData);
  }
}, [userData])
  // const chartData = {
  //   labels: ["Science", "Computer Science", "Social Studies", "II Language", "GP"],
  //   datasets: [
  //     {
  //       label: "Marks",
  //       data: [70, 95, 45, 60, 80],
  //       backgroundColor: ["#3498DB", "#2ECC71", "#F1C40F", "#9B59B6", "#E74C3C"],
  //       borderRadius: 5,
  //     },
  //   ],
  // }
  const percentages = [
    { value: acPer, label: "Assessment Criteria", component: "ac" },
    { value: loPer, label: "Learning Outcome", component: "lo" },
    { value: roPer, label: "Report Outcome", component: "ro" },
  ]
  const handleComponentClick = (component) => {
    setActiveComponent(component)
  }
  const handleOnBack =()=>{
    setActiveComponent(null)
    if (!activeComponent) {
      onBack();
    }
  }
  const renderScoreComponent = () => {
    switch(activeComponent) {
      case 'ac':
        return <div className="score-component"><AcScores student={student} handleOnBack={handleOnBack} acScoreList={acScoreList}/></div>
      case 'lo':
        return <div className="score-component"><LoScores student={student} handleOnBack={handleOnBack} loScoreList={loScoreList}/></div>
      case 'ro':
        return <div className="score-component"><RoScores student={student} handleOnBack={handleOnBack} roScoreList={roScoreList}/></div>
      default:
        return null
    }
  }
  return (
    <Wrapper>
      <div className="main-container">
        {activeComponent === null ? (
          <>
            <header className="header">
              <FaArrowLeft className="back-icon" onClick={onBack} />
              <h2>Student Report</h2>
            </header>
            <div className="student-info">
              <div className="profile-pic">
                <img src={profilePic} alt="Profile" />
              </div>
              <div className="student-details">
                <p><strong>Name:</strong> {student.name}</p>
                <p><strong>Section:</strong> {student.section}</p>
                <p><strong>Roll No: </strong> {student.id}</p>
                <p><strong>Grade:</strong> {student.class}</p>
              </div>
            </div>
            <h3 className="average-title">Average Percentage</h3>
            <div className="percentage-container">
              {percentages.map((item, index) => (
                <div key={index} className="percentage" onClick={() => handleComponentClick(item.component)}>
                  <CircularProgressbar value={item.value} text={`${item.value}%`} styles={buildStyles({
                    textSize: "14px", pathColor: "#16A085", textColor: "#333", trailColor: "#D6D6D6", strokeLinecap: "round"
                  })} />
                  <p>{item.label}</p>
                </div>
              ))}
            </div>
            {/* <h3 className= "subject-title">Subject Performance</h3>
            <div className="chart-container">
              <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div> */}
          </>
        ) : (
          <div className="score-container">
            {renderScoreComponent()}
          </div>
        )}
      </div>
    </Wrapper>
  )
}
export default Student_report