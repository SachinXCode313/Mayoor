import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Form_LO from "../Form_LO/index";
import axios from "axios";

const LOMapping = ({ roId, loItems }) => {
  const [priorityMapping, setPriorityMapping] = useState({}); 
  const [isLocked, setIsLocked] = useState(false); 
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
    if (isLocked) return;

    setPriorityMapping((prev) => ({
      ...prev,
      [loid]: priority.toLowerCase(),
    }));
  };

  const handleDone = async () => {    
    if (isLocked) return; 
    
    const body = {
      ro_id: roId,
      data: Object.entries(priorityMapping).map(([lo_id, priority]) => ({
        lo_id: Number(lo_id),
        priority,
      })),
    };

    console.log("Data to be sent:", body);

    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN', 
      'Content-Type': 'application/json',
      year: userData?.year,
      subject: userData?.subject,
      quarter: userData?.quarter,
      section: userData?.section,
      classname: userData?.class,
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/report-outcome-mapping`,
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
        ro_id: roId,
        year: userData.year,
        classname: userData.class,
        section: userData.section,
        subject: userData.subject,
        quarter: userData.quarter,
      };

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/report-outcome-mapping`,
          { headers }
        );
        const { data } = response.data;

        console.log("Response Come Data:", data);

        if (data.length > 0) {
          setIsLocked(true);
          const newPriorityMapping = {};
          data.forEach(({ lo_id, priority }) => {
            newPriorityMapping[lo_id] = priority.toLowerCase();
          });
          setPriorityMapping(newPriorityMapping);
        } else {
          setIsLocked(false);
        }
      } catch (error) {
        console.error("Error fetching ac score:", error.response || error.message);
        setPriorityMapping({});
        setIsLocked(false);
      }
    };

    loadLoAcMapping();
  }, [userData, roId]);

  return (
    <Wrapper>
      <div className="lo-list-container">
        <div className="lo-list">
          {loItems.map((lo) => {
            const selectedPriority = priorityMapping[lo.id] || "";

            return(
            <div key={lo.id} className="lo-item">
              <div>
                <span className="name">{lo.name}</span>
              </div>
              <div className="priority-buttons">
              <button
                    className={`priority-button ${selectedPriority === "h" ? "h" : ""}`}
                    onClick={() => handleClick(lo.id, "H")}
                    disabled={isLocked}
                  >
                  H
                </button>
                <button
                    className={`priority-button ${selectedPriority === "m" ? "m" : ""}`}
                    onClick={() => handleClick(lo.id, "M")}
                    disabled={isLocked}
                  >
                  M
                </button>
                <button
                    className={`priority-button ${selectedPriority === "l" ? "l" : ""}`}
                    onClick={() => handleClick(lo.id, "L")}
                    disabled={isLocked}
                  >
                  L
                </button>
              </div>
            </div>

            )
          })}
        </div>
        <div className="btns">
          <input type="button" value="Add New LO" className="add" onClick={handleform} disabled={isLocked} />
          <input type="button" value="Done" className="btn" onClick={handleDone} disabled={isLocked} />
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
