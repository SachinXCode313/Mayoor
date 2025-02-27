import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Form_AC from "../Form_AC/index";
import axios from "axios";

const ACMapping = ({ loId, acList }) => {
  const [priorityMapping, setPriorityMapping] = useState({});
  const [lockedPriorities, setLockedPriorities] = useState({}); // Track locked ACs
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredLoListMapping, setFilteredLoListMapping] = useState([]);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  const handleform = () => {
    setShowForm(true);
  };

  const handleClick = (acid, priority) => {
    if (lockedPriorities[acid]) return; // Prevent changing locked priorities
    setPriorityMapping((prev) => {
      if (prev[acid] === priority.toLowerCase()) {
        const newMapping = { ...prev };
        delete newMapping[acid]; // Deselect if already selected
        return newMapping;
      }
      return { ...prev, [acid]: priority.toLowerCase() };
    });
  };

  const loadLOMapping = async (userData) => {
    setLoading(true);
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json',
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/learning-outcome-mapping`, { headers });
      const data = response.data;
      let finalData = [];
      if (Array.isArray(data)) {
        finalData = data;
      } else if (Array.isArray(data.ro)) {
        finalData = data.ro;
      } else if (Array.isArray(data.lo)) {
        finalData = data.lo;
      }
      setFilteredLoListMapping(finalData);
    } catch (error) {
      console.error('Error fetching LO Mapping:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      loadLOMapping(userData);
    }
  }, [userData]);

  return (
    <Wrapper>
      <div className="ac-list-container">
        <div className="ac-list">
          {acList.map((ac) => {
            const selectedPriority = priorityMapping[ac.id] || "";

            return (
              <div key={ac.id} className="ac-item">
                <div>
                  <span className="name">{ac.name}</span>
                </div>
                <div className="priority-buttons">
                  <button
                    className={`priority-button ${selectedPriority === "h" ? "h" : ""}`}
                    onClick={() => handleClick(ac.id, "H")}
                    disabled={lockedPriorities[ac.id]}
                  >
                    H
                  </button>
                  <button
                    className={`priority-button ${selectedPriority === "m" ? "m" : ""}`}
                    onClick={() => handleClick(ac.id, "M")}
                    disabled={lockedPriorities[ac.id]}
                  >
                    M
                  </button>
                  <button
                    className={`priority-button ${selectedPriority === "l" ? "l" : ""}`}
                    onClick={() => handleClick(ac.id, "L")}
                    disabled={lockedPriorities[ac.id]}
                  >
                    L
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="btns">
          {/* <input
            type="button"
            value="Add"
            className="addBtn"
            onClick={handleform}
          /> */}
          <input
            type="button"
            value="Done"
            className="btn"
          />
        </div>
      </div>
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Form_AC closeForm={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default ACMapping;
