import React, { useState , useEffect} from "react";
import { Line } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import "./ClassViewStyle"
import Menu from "../MenuBar/index";

import imgUser from "../assets/user.png";
// import imgBack from "../assets/Vector.png";
import imgMenu from "../assets/menu.png";
import imgBell from "../assets/bell.png";

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const ClassView = ({ setIndex, user , onLogout }) => {
  const [selectedChart, setSelectedChart] = useState("ac");
  const [acData, setAcData] = useState([]);
  const [loData, setLoData] = useState([]);
  const [roData, setRoData] = useState([]);
  const [userData, setUserData] = useState('');

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const headers = {
          "Content-Type": "application/json",
          "subject": userData.subject,
          "classname": userData.class,
          "year": userData.year,
          "quarter": userData.quarter,
          "section": userData.section,
          // "subject": "2",
          // "classname": "5",
          // "year": "2024",
          // "quarter": "1",
          // "section": "Orchid",
        };

        const acResponse = await fetch("https://mayoor-backend.vercel.app/api/class-average-ac-score", {
          method: "GET",
          headers: headers,
        });
        const loResponse = await fetch("https://mayoor-backend.vercel.app/api/class-average-lo-score", {
          method: "GET",
          headers: headers,
        });
        const roResponse = await fetch("https://mayoor-backend.vercel.app/api/class-average-ro-score", {
          method: "GET",
          headers: headers,
        });

        const acScores = await acResponse.json();
        const loScores = await loResponse.json();
        const roScores = await roResponse.json();

        // Extracting average scores for the chart
        const acData = acScores.class_ac_averages.map(item => item.average_score);
        const loData = loScores.class_lo_averages.map(item => item.average_score);
        const roData = roScores.class_ro_averages.map(item => item.average_score);

        setAcData(acData);
        setLoData(loData);
        setRoData(roData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userData]);

  const chartData = {
    ac: {
      labels: ["AC 1", "AC 2", "AC 3", "AC 4", "AC 5", "AC 6", "AC 7", "AC 8", "AC 9", "AC 10"],
      datasets: [
        {
          label: "AC Scores",
          data: acData,
          borderColor: "#3b82f6",
          fill: false,
          pointBackgroundColor: "#3b82f6",
        },
      ],
    },
    lo: {
      labels: ["LO 1", "LO 2", "LO 3", "LO 4", "LO 5", "LO 6", "LO 7", "LO 8", "LO 9", "LO 10"],
      datasets: [
        {
          label: "LO Scores",
          data: loData,
          borderColor: "#ff7f50",
          fill: false,
          pointBackgroundColor: "#ff7f50",
        },
      ],
    },
    ro: {
      labels: ["RO 1", "RO 2", "RO 3", "RO 4", "RO 5", "RO 6", "RO 7", "RO 8", "RO 9", "RO 10"],
      datasets: [
        {
          label: "RO Scores",
          data: roData,
          borderColor: "#32cd32",
          fill: false,
          pointBackgroundColor: "#32cd32",
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

  const handleClick = () => {
    setIndex(1);
  };

      const handleProfileClick = () => alert("Go to Profile");
      const handleSettingsClick = () => alert("Open Settings");
      // const handleLogoutClick = () => {
      //   handleLogout()
      //   alert("Logging Out...");
      // }
  return (
    <div className="class-container">
      <div className="class-header">
      <div className="class-overview">
          <div className="class-title">Class Overview</div>
        </div>
        <div className="header-icons">
          <div className="back-icon">
            {/* <img src={imgBack} alt="Back" className="header-image" /> */}
          </div>
          <div className="right-icons">
            {/* <img src={imgBell} alt="Bell" className="header-image" /> */}
          <Menu
             onProfileClick={handleProfileClick}
             onSettingsClick={handleSettingsClick}
             onLogout={onLogout}
             onReturnClick={handleClick}
          />
          </div>
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