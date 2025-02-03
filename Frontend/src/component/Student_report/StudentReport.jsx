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
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Registering chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Student_report = ({ student, onBack, id }) => {
  const [activeComponent, setActiveComponent] = useState(null);

  const chartData = {
    labels: ["Science", "Computer Science", "Social Studies", "II Language", "GP"],
    datasets: [
      {
        label: "Marks",
        data: [70, 95, 45, 60, 80],
        backgroundColor: ["#3498db", "#2ecc71", "#f1c40f", "#9b59b6", "#e74c3c"],
        borderRadius: 5,
      },
    ],
  };

  const percentages = [
    { value: 72.89, label: "Assessment Criteria", component: "ac" },
    { value: 42.01, label: "Learning Outcome", component: "lo" },
    { value: 50, label: "Report Outcome", component: "ro" },
  ];

  const handleComponentClick = (component) => {
    setActiveComponent(component);
  };

  const renderScoreComponent = () => {
    switch(activeComponent) {
      case 'ac':
        return <div className="score-component"><AcScores student={student} /></div>;
      case 'lo':
        return <div className="score-component"><LoScores student={student}/></div>;
      case 'ro':
        return <div className="score-component"><RoScores student={student}/></div>;
      default:
        return null;
    }
  };

  return (
    <Wrapper>
      <header className="header">
        <FaArrowLeft className="back-icon" onClick={onBack} />
        <h2>Student Report</h2>
      </header>

      <div className="main-container">
        {activeComponent === null ? (
          <>
            <div className="student-info">
              <div className="profile-pic">
                <img src={profilePic} alt="Profile" />
              </div>
              <div className="student-details">
                <p><strong>Name:{student.name}</strong></p>
                <p><strong>Roll No:{student.id}</strong> </p>
                <p><strong>Grade:</strong> {student.class}</p>
              </div>
              <div className="student-section">
                <p><strong>Section:{student.section}</strong> </p>
                {/* <p><strong>Quarter:</strong> Q2</p> */}
              </div>
            </div>

            <h3 className="average-title">Average Percentage</h3>
            <div className="percentage-container">
              {percentages.map((item, index) => (
                <div key={index} className="percentage" onClick={() => handleComponentClick(item.component)}>
                  <CircularProgressbar value={item.value} text={`${item.value}%`} styles={buildStyles({
                    textSize: "14px", pathColor: "#16a085", textColor: "#333", trailColor: "#d6d6d6", strokeLinecap: "round"
                  })} />
                  <p>{item.label}</p>
                </div>
              ))}
            </div>

            <div className="chart-container">
              <h3>Subject Performance</h3>
              <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
            </div>

            <div className="remark-section">
              <textarea placeholder="Teacher's Remark"></textarea>
              <FaEdit className="edit-icon" />
            </div>
          </>
        ) : (
          <div className="score-container">
            {renderScoreComponent()}
          </div>
        )}
      </div>
    </Wrapper>
  );
};

export default Student_report;