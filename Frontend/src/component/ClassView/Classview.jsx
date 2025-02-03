import React, { useState , useEffect} from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import "./ClassViewStyle"
import imgUser from "../assets/user.png";
import imgBack from "../assets/Vector.png";
import imgMenu from "../assets/menu.png";
import imgBell from "../assets/bell.png";
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);
const chartData = {
  ac: {
    labels: ["AC 1", "AC 2", "AC 3", "AC 4", "AC 5", "AC 6", "AC 7", "AC 8", "AC 9", "AC 10"],
    datasets: [
      {
        label: "AC Scores",
        data: [0.1, 0.2, 0.5, 0.3, 0.7, 0.8, 0.9],
        borderColor: "#3B82F6",
        fill: false,
        pointBackgroundColor: "#3B82F6",
      },
    ],
  },
  lo: {
    labels: ["LO 1", "LO 2", "LO 3", "LO 4", "LO 5", "LO 6", "LO 7", "LO 8", "LO 9", "LO 10"],
    datasets: [
      {
        label: "LO Scores",
        data: [0.1, 0.2, 0.5, 0.6, 0.7, 0.8, 0.9],
        borderColor: "#FF7F50",
        fill: false,
        pointBackgroundColor: "#FF7F50",
      },
    ],
  },
  ro: {
    labels: ["RO 1", "RO 2", "RO 3", "RO 4", "RO 5", "RO 6", "RO 7", "RO 8", "RO 9", "RO 10"],
    datasets: [
      {
        label: "RO Scores",
        data: [0.1, 0.2, 0.5, 0.6, 0.7, 0.8, 0.9],
        borderColor: "#32CD32",
        fill: false,
        pointBackgroundColor: "#32CD32",
      },
    ],
  },
};
const options = {
  responsive: true,
  plugins: { legend: { display: false } },
  maintainAspectRatio: false,
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      min: 0.0,
      max: 1.0,
      ticks: {
        stepSize: 0.1,
        callback: (value) => value.toFixed(1),
      },
    },
  },
};
const ClassView = ({setIndex, user}) => {
  const [selectedChart, setSelectedChart] = useState("ac");
  const handleClick = () => {
    setIndex(1)
  }
  const [userData, setUserData] = useState('');
      useEffect(() => {
        const userData = sessionStorage.getItem("userData");
        if (userData) {
          setUserData(JSON.parse(userData));
        }
      }, []);
  return (
    <div className="class-container">
      <div className="class-header">
        <div className="header-icons">
          <div className="back-icon">
            {/* <img src={imgBack} alt="Back" className="header-image" /> */}
          </div>
          <div className="right-icons">
            <img src={imgUser} alt="User" className="header-image" />
            <img src={imgBell} alt="Bell" className="header-image" />
            <img src={imgMenu} alt="Menu" className="header-image" onClick={handleClick} />
          </div>
        </div>
        <div className="class-overview">
          <div className="class-title">Class Overview</div>
        </div>
      </div>
      <div className="info-box">
        <div className="info-text">
          <p>
            <strong>Class:</strong> {userData.class}
          </p>
          <p>
            <strong>Year:</strong> {userData.year}
          </p>
          <p>
            <strong>Subject:</strong> {userData.subject}
          </p>
        </div>
        <div className="info-text">
          <p>
            <strong>Section:</strong> {userData.section}
          </p>
          <p>
            <strong>Quarter:</strong> {userData.quarter}
          </p>
        </div>
      </div>
      <select className="chart-dropdown" onChange={(e) => setSelectedChart(e.target.value)}>
        <option value="ac">AC Scores</option>
        <option value="lo">LO Scores</option>
        <option value="ro">RO Scores</option>
      </select>
      <div className="chart-wrapper">
        <div className="chart-container">
          <Line data={chartData[selectedChart]} options={options} />
        </div>
      </div>
    </div>
  );
};
export default ClassView;
