import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Form_AC from "../Form_AC/index";
import axios from "axios";
const ACMapping = ({ loId, acItems }) => {
  const [priorityMapping, setPriorityMapping] = useState({});
  const [isLocked, setIsLocked] = useState(false); // Lock all ACs if any priority exists
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
  const handleClick = (acid, priority) => {
    if (isLocked) return; // Prevent changing priorities if locked
    setPriorityMapping((prev) => ({
      ...prev,
      [acid]: priority.toLowerCase(),
    }));
  };
  const handleDone = async () => {
    if (isLocked) return; // Prevent sending data if locked
    const body = {
      lo_id: loId,
      data: Object.entries(priorityMapping).map(([ac_id, priority]) => ({
        ac_id: Number(ac_id),
        priority,
      })),
    };
    console.log("Data to be sent:", JSON.stringify(body, null, 2));
    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
      year: userData?.year,
      subject: userData?.subject,
      quarter: userData?.quarter,
      section: userData?.section,
      classname: userData?.class,
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/learning-outcome-mapping`,
        body,
        { headers }
      );
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  useEffect(() => {
    const loadLoAcMapping = async () => {
      if (!userData) return;
      const headers = {
        Authorization: "Bearer YOUR_ACCESS_TOKEN",
        "Content-Type": "application/json",
        lo_id: loId,
        year: userData.year,
        classname: userData.class,
        section: userData.section,
        subject: userData.subject,
        quarter: userData.quarter,
      };
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/learning-outcome-mapping`,
          { headers }
        );
        const { data } = response.data;
        console.log("Response Come Data:", data);
        if (data.length > 0) {
          setIsLocked(true); // If any priority exists, lock all ACs
          const newPriorityMapping = {};
          data.forEach(({ ac_id, priority }) => {
            newPriorityMapping[ac_id] = priority.toLowerCase();
          });
          setPriorityMapping(newPriorityMapping);
        } else {
          setIsLocked(false); // If no priority exists, allow user selection
        }
      } catch (error) {
        console.error("Error fetching ac score:", error.response || error.message);
        setPriorityMapping({});
        setIsLocked(false);
      }
    };
    loadLoAcMapping();
  }, [userData, loId]);
  return (
    <Wrapper>
      <div className="ac-list-container">
        <div className="ac-list">
          {acItems.map((ac) => {
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
                    disabled={isLocked}
                  >
                    H
                  </button>
                  <button
                    className={`priority-button ${selectedPriority === "m" ? "m" : ""}`}
                    onClick={() => handleClick(ac.id, "M")}
                    disabled={isLocked}
                  >
                    M
                  </button>
                  <button
                    className={`priority-button ${selectedPriority === "l" ? "l" : ""}`}
                    onClick={() => handleClick(ac.id, "L")}
                    disabled={isLocked}
                  >
                    L
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="btns">
          <input type="button" value="Add New AC" className="addBtn" onClick={handleform} disabled={isLocked} />
          <input type="button" value="Done" className="btn" onClick={handleDone} disabled={isLocked} />
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

