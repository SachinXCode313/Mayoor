import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Form_LO from "../Form_LO/index"
import axios from "axios";

const LOMapping = ({userData, roId}) => {
  // const [loList, setLoList] = useState([
  //   { id: 1, priority: "" , description:"title"},
  //   { id: 2, priority: "" , description:"title"},
  //   { id: 3, priority: "" , description:"title"},
  //   { id: 4, priority: "" , description:"title"},
  //   { id: 5, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  //   { id: 6, priority: "" , description:"title"},
  // ]);

  const [loList, setLoList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [priorityMapping, setPriorityMapping] = useState({}); // Stores priorities by roId and acId

  useEffect(() => {
      // Retrieve stored AC list from localStorage
      const storedAcList = localStorage.getItem("loList");
      if (storedAcList) {
        setLoList(JSON.parse(storedAcList));
      } else {
        console.warn("No LO List found in localStorage");
      }

      const savedPriorityMapping = localStorage.getItem(`priorityMapping_${roId}`);
    if (savedPriorityMapping) {
      setPriorityMapping(JSON.parse(savedPriorityMapping));
    }
    }, [roId]);

  
  const handleform = () => {
    setShowForm(true); // Set to true when button is clicked
  };

  const handleClick = (loid, priority) => {
    if (priorityMapping[roId]?.isLocked) return; // Prevent changes if it's locked

    setPriorityMapping((prev) => {
      const updatedPriorityMapping = { ...prev };

      // Initialize loid Data if it doesn't exist
      if (!updatedPriorityMapping[roId]) {
        updatedPriorityMapping[roId] = { Data: {}, isLocked: false }; // Add `isLocked` to prevent further changes
      }

      const loidData = updatedPriorityMapping[roId].Data;

      // Toggle the priority for the acId (if it's already selected, deselect it)
      loidData[loid] = loidData[loid] === priority ? "" : priority;

      return updatedPriorityMapping;
    });
  };

  const handleDone = async () => {
    // Lock the priority mapping after the user is done
    setPriorityMapping((prev) => {
      const updatedPriorityMapping = { ...prev };
      updatedPriorityMapping[roId].isLocked = true; // Lock the selection

      // Save to localStorage
      localStorage.setItem(`priorityMapping_${roId}`, JSON.stringify(updatedPriorityMapping));

      return updatedPriorityMapping;
    });

    // Filter out empty priorities in priorityMapping
    const filteredPriorityMapping = { ...priorityMapping };

    Object.keys(filteredPriorityMapping).forEach((loIdKey) => {
      const loidData = filteredPriorityMapping[loIdKey].Data;
      Object.keys(loidData).forEach((loid) => {
        if (!loidData[loid]) {
          delete loidData[loid]; // Remove entry with empty priority
        }
      });

      // If no data remains for this roId, delete the roId entry itself
      if (Object.keys(loidData).length === 0) {
        delete filteredPriorityMapping[loIdKey];
      }
    });

    // Log the filtered priority mapping
    console.log("Filtered Priority Data:", filteredPriorityMapping);

    const body = {
      data: filteredPriorityMapping
    };

    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with the actual token
      'Content-Type': 'application/json',
      year: userData.year,
      subject: userData.subject,
      quarter: userData.quarter,
    };

    // Make the POST request to send the filtered priorityMapping data via Axios
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/report-outcomes-mapping`, // Replace with your actual API URL
        body,
        { headers }
      );
      // Handle the response from the API (if needed)
      console.log("API Response:", response.data);
    } catch (error) {
      // Handle error if request fails
      console.error("Error sending data:", error);
    }
  };

  return (
    <Wrapper>
      <div className="lo-list-container">
        <div className="lo-list">
          {loList.map((lo, index) => (
            <div key={lo.id} className="lo-item">
              <div>
                {/* <h2>LO {index + 1}</h2> */}
                <span className="name">{lo.name}</span>
              </div>
              <div className="priority-buttons">
                <button
                  className={`priority-button ${
                    priorityMapping[roId]?.Data[lo.id] === "H" ? "h" : ""
                  }`}
                  onClick={() => handleClick(lo.id, "H")}
                  disabled={priorityMapping[roId]?.isLocked} // Disable button if locked
                >
                  H
                </button>
                <button
                  className={`priority-button ${
                    priorityMapping[roId]?.Data[lo.id] === "M" ? "m" : ""
                  }`}
                  onClick={() => handleClick(lo.id, "M")}
                  disabled={priorityMapping[roId]?.isLocked} // Disable button if locked
                >
                  M
                </button>
                <button
                  className={`priority-button ${
                    priorityMapping[roId]?.Data[lo.id] === "L" ? "l" : ""

                  }`}
                  onClick={() => handleClick(lo.id, "L")}
                  disabled={priorityMapping[roId]?.isLocked} // Disable button if locked
                >
                  L
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="btns">
          <input type="button" value="Add New LO" className="add" onClick={handleform}/>
          <input type="button" value="Done" className="btn" onClick={handleDone}/>
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