import React, { useState, useEffect } from "react";
import axios from "axios";
import Wrapper from "./style";

const Form_LO = ({ closeForm, loadLO }) => {
  const [loInput, setLoInput] = useState("");
  const [filteredRoList, setFilteredRoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData(parsedUserData);
        if (parsedUserData?.year && parsedUserData?.class) {
          loadRO(parsedUserData);
        } else {
          console.error("Invalid userData:", parsedUserData);
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    } else {
      console.warn("No userData found in sessionStorage");
    }
  }, []);

  const loadRO = async (userData) => {
    if (!userData) return;
    setLoading(true);
    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
    };
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/report-outcome`,
        { headers }
      );
      let finalData = [];
      if (Array.isArray(response.data)) {
        finalData = response.data;
      } else if (Array.isArray(response.data.ro)) {
        finalData = response.data.ro;
      } else {
        console.warn("API response does not contain expected data format:", response.data);
      }
      setFilteredRoList(finalData);
    } catch (error) {
      console.error("Error fetching ROs:", error.response?.data || error.message);
      alert(`Error loading RO data: ${error.response?.data?.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (loInput.trim() === "") {
      alert("Please enter a valid LO!");
      return;
    }
    try {
      const headers = {
        Authorization: "Bearer YOUR_ACCESS_TOKEN",
        "Content-Type": "application/json",
        classname: userData.class,
        year: userData.year,
        subject: userData.subject,
        quarter: userData.quarter,
      };
      const body = { name: loInput };
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/learning-outcome`,
        body,
        { headers }
      );
      if (response.status === 201) {
        alert("LO successfully added!");
        loadLO(userData);
      } else {
        alert("Failed to add LO. Please try again!");
      }
    } catch (error) {
      console.error("Error adding new LO:", error.response || error.message);
      alert("Failed to add LO. Please try again!");
    }
    closeForm();
  };

  return (
    <Wrapper>
      <div className="form-container">
        <p className="header">Enter the LO you want to add :</p>
        <input
          type="text"
          placeholder="Enter Learning Outcome"
          className="input"
          value={loInput}
          onChange={(e) => setLoInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <ul className="ro-list">
          {loading ? (
            <li><p className="loading-message">Loading...</p></li>
          ) : filteredRoList.length > 0 ? (
            filteredRoList.map((item) => (
              <li key={item.id} className="ro-list-item">
                <div className="ro-header">
                  <div className="ro-info">
                    <input type="checkbox" />
                    <p className="para">{item.name}</p>
                  </div>
                </div>
              </li>
            ))
          ) : (
            <li className="no-results">
              <p className="no_results">No Report Outcomes Found</p>
            </li>
          )}
        </ul>
        <div className="buttons">
          <input type="button" value="Close" className="closebtn" onClick={closeForm} />
          <input type="button" value="Add" className="submitbtn" onClick={handleSubmit} />
        </div>
      </div>
    </Wrapper>
  );
};

export default Form_LO;
