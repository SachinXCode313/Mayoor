import React, { useState , useEffect} from "react";
import Wrapper from "./style";
import Form_AC from "../Form_AC/index";
import axios from "axios"; // Import axios

const ACMapping = ({  loId, acItems }) => {
  const [priorityMapping, setPriorityMapping] = useState({}); // Stores priorities by loId and acId
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
    const lowerCasePriority = priority.toLowerCase();
  
    setPriorityMapping((prev) => {
      const updatedPriorityMapping = { ...prev };
  
      // Ensure loId exists before accessing its Data property
      if (!updatedPriorityMapping[loId]) {
        updatedPriorityMapping[loId] = { Data: [] };
      }
  
      const existingEntryIndex = updatedPriorityMapping[loId].Data.findIndex(
        (entry) => entry.ac_id === acid
      );
  
      if (existingEntryIndex !== -1) {
        updatedPriorityMapping[loId].Data[existingEntryIndex].priority = lowerCasePriority;
      } else {
        updatedPriorityMapping[loId].Data.push({ ac_id: acid, priority: lowerCasePriority });
      }
  
      return updatedPriorityMapping;
    });
  };
  
  const handleDone = async () => {
    const body = {
      lo_id: loId, // Correct key name
      data: priorityMapping[loId]?.Data || [],
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
        `${process.env.REACT_APP_API_URL}/api/learning-outcome-mapping`,
        body,
        { headers }
      );
      console.log("API Response:", response.data);
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };
  

  return (
    <Wrapper>
      <div className="ac-list-container">
        <div className="ac-list">
          {acItems.map((ac, index) => (
            <div key={ac.id} className="ac-item">
              <div>
                <span className="name">{ac.name}</span>
              </div>
              <div className="priority-buttons">
              <button
                  className={`priority-button ${
                    priorityMapping[loId]?.Data.find(
                      (entry) => entry.ac_id === ac.id
                    )?.priority === "h"
                      ? "h"
                      : ""
                  }`}
                  onClick={() => handleClick(ac.id, "H")}
                  disabled={priorityMapping[loId]?.isLocked} // Disable button if locked
                >
                  H
                </button>
                <button
                  className={`priority-button ${
                    priorityMapping[loId]?.Data.find(
                      (entry) => entry.ac_id === ac.id
                    )?.priority === "m"
                      ? "m"
                      : ""
                  }`}
                  onClick={() => handleClick(ac.id, "M")}
                  disabled={priorityMapping[loId]?.isLocked} // Disable button if locked
                >
                  M
                </button>
                <button
                  className={`priority-button ${
                    priorityMapping[loId]?.Data.find(
                      (entry) => entry.ac_id === ac.id
                    )?.priority === "l"
                      ? "l"
                      : ""
                  }`}
                  onClick={() => handleClick(ac.id, "L")}
                  disabled={priorityMapping[loId]?.isLocked} // Disable button if locked
                >
                   L
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="btns">
          <input type="button" value="Add New AC" className="addBtn" onClick={handleform} />
          <input type="button" value="Done" className="btn" onClick={handleDone} />
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