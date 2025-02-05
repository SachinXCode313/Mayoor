import React, { useState } from "react";
import { FaArrowLeft, FaEdit } from "react-icons/fa";
import { Bar } from "react-chartjs-2";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import profilePic from '../assets/Group 463.png';
import AcScores from '../acscore/acScores';
import LoScores from '../loscore/loScores';
import RoScores from '../roscore/roScores';
import Wrapper from './StudentReport';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"
// Registering chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const Student_report = ({ student, onBack, id }) => {
  const [activeComponent, setActiveComponent] = useState(null)
  const chartData = {
    labels: ["Science", "Computer Science", "Social Studies", "II Language", "GP"],
    datasets: [
      {
        label: "Marks",
        data: [70, 95, 45, 60, 80],
        backgroundColor: ["#3498DB", "#2ECC71", "#F1C40F", "#9B59B6", "#E74C3C"],
        borderRadius: 5,
      },
    ],
  }
  const percentages = [
    { value: 72.89, label: "Assessment Criteria", component: "ac" },
    { value: 42.01, label: "Learning Outcome", component: "lo" },
    { value: 50, label: "Report Outcome", component: "ro" },
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
        return <div className="score-component"><AcScores student={student} handleOnBack={handleOnBack}/></div>
      case 'lo':
        return <div className="score-component"><LoScores student={student} handleOnBack={handleOnBack}/></div>
      case 'ro':
        return <div className="score-component"><RoScores student={student} handleOnBack={handleOnBack}/></div>
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
            <h3 className= "subject-title">Subject Performance</h3>
            <div className="chart-container">
              <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>
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