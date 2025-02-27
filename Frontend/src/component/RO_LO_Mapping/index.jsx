import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Form_LO from "../Form_LO/index";
import axios from "axios";

const LOMapping = ({ roId, loItems }) => {
  const [priorityMapping, setPriorityMapping] = useState({});
  const [lockedPriorities, setLockedPriorities] = useState({}); // Store locked priorities
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  const handleform = () => {
    setShowForm(true);
  };

  const handleClick = (loid, priority) => {
    if (lockedPriorities[loid]) return; // Lock only specific LO priorities
    setPriorityMapping((prev) => {
      if (prev[loid] === priority.toLowerCase()) {
        const newMapping = { ...prev };
        delete newMapping[loid]; // Deselect if already selected
        return newMapping;
      }
      return { ...prev, [loid]: priority.toLowerCase() };
    });
  };

  return (
    <Wrapper>
      <div className="lo-list-container">
        <div className="lo-list">
          {loItems.map((lo) => {
            const selectedPriority = priorityMapping[lo.id] || "";
            return (
              <div key={lo.id} className="lo-item">
                <div>
                  <span className="name">{lo.name}</span>
                </div>
                <div className="priority-buttons">
                  <button
                    className={`priority-button ${selectedPriority === "h" ? "h" : ""}`}
                    onClick={() => handleClick(lo.id, "H")}
                    disabled={lockedPriorities[lo.id]}
                  >
                    H
                  </button>
                  <button
                    className={`priority-button ${selectedPriority === "m" ? "m" : ""}`}
                    onClick={() => handleClick(lo.id, "M")}
                    disabled={lockedPriorities[lo.id]}
                  >
                    M
                  </button>
                  <button
                    className={`priority-button ${selectedPriority === "l" ? "l" : ""}`}
                    onClick={() => handleClick(lo.id, "L")}
                    disabled={lockedPriorities[lo.id]}
                  >
                    L
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="btns">
          {/* <input type="button" value="Add" className="add" onClick={handleform} /> */}
          <input type="button" value="Done" className="btn" />
        </div>
      </div>
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Form_LO closeForm={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default LOMapping;
