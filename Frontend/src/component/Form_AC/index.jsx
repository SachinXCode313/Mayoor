import React, { useState, useEffect } from "react";
import axios from "axios";
import Wrapper from "./style";
const Form_AC = ({ closeForm, loadAC }) => {
  const [acName, setAcName] = useState("");
  const [maxMarks, setMaxMarks] = useState("");
  const [userData, setUserData] = useState(null);
  const [filteredLoList, setFilteredLoList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addAssess, setAddAssess] = useState(true);
  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        console.log(":white_check_mark: Loaded User Data:", parsedUserData); // Debugging
        setUserData(parsedUserData);
        // :white_check_mark: Load LO only if userData is valid
        if (parsedUserData?.year && parsedUserData?.class) {
          loadLO(parsedUserData);
        } else {
          console.error("Invalid userData:", parsedUserData);
        }
      } catch (error) {
        console.error("Error parsing userData:", error);
      }
    } else {
      console.warn(":warning: No userData found in sessionStorage");
    }
  }, []);
  const loadLO = async (userData) => {
    if (!userData) return; // Prevent calling API with null userData
    setLoading(true);
    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN",
      "Content-Type": "application/json",
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };
    try {
      console.log("Fetching LO Data with Headers:", headers); // Debugging
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/learning-outcome`,
        { headers }
      );
      console.log("API Response:", response.data); // Debugging API response
      let finalData = [];
      if (Array.isArray(response.data)) {
        finalData = response.data;
      } else if (Array.isArray(response.data.lo)) {
        finalData = response.data.lo;
      } else if (Array.isArray(response.data.ro)) {
        finalData = response.data.ro;
      } else {
        console.warn("API response does not contain expected data format:", response.data);
      }
      // handleLoItems(finalData);
      setFilteredLoList(finalData);
      // console.log(handleLoItems)
    } catch (error) {
      console.error(" Error fetching LOs:", error.response?.data || error.message);
      alert(`Error loading LO data: ${error.response?.data?.message || "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async () => {
    if (!acName.trim() || !maxMarks) {
      alert("Please fill in all fields.");
      return;
    }
    if (!userData.year || !userData.class || !userData.section || !userData.subject || !userData.quarter) {
      alert("Missing user details. Ensure all fields are filled in.");
      return;
    }
    const headers = {
      Authorization: "Bearer YOUR_ACCESS_TOKEN", // Replace with actual token
      "Content-Type": "application/json",
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };
    const body = {
      name: acName.trim(),
      max_marks: parseInt(maxMarks, 10),
    };
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/assessment-criteria`,
        body,
        { headers }
      );
      if (response.status === 201) {
        alert("AC successfully added!");
        setAcName("");
        setMaxMarks("");
        loadAC();
        closeForm();
      } else {
        alert("Failed to add AC. Please try again!");
      }
    } catch (error) {
      console.error("Error adding new AC:", error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || "Failed to add AC."}`);
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(); // Trigger form submission when Enter is pressed
    }
  };
  return (
    <Wrapper>
      <div className="form-box">
        <div className="toggle-buttons">
          <input
            type="button"
            value="Add Assessment"
            className={addAssess ? "active" : ""}
            onClick={() => setAddAssess(true)}
          />
          <input
            type="button"
            value="Final Assessment"
            className={!addAssess ? "active" : ""}
            onClick={() => setAddAssess(false)}
          />
        </div>
        <form>
          <input
            type="text"
            placeholder="Enter Assessment Criteria"
            value={acName}
            onChange={(e) => setAcName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Enter Maximum Marks"
            value={maxMarks}
            onChange={(e) => setMaxMarks(e.target.value)}
          />
          <ul className="lo-list">
            {loading ? (
              <li>
                <p className="loading-message">Loading...</p>
              </li>
            ) : filteredLoList.length > 0 ? (
              filteredLoList.map((item) => (
                <li key={item.id} className="lo-list-item">
                  <div className="lo-header">
                    <div className="lo-info">
                      <input type="checkbox" />
                      <p>{item.name}</p>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li className="no-results">
                <p className="no_results">No Learning Outcomes Found</p>
              </li>
            )}
          </ul>
          <div className="buttons">
            <input type="button" value="Close" onClick={closeForm} className="closebtn" />
            <input type="button" value="Add" className="savebtn" onClick={handleSubmit} />
          </div>
        </form>
      </div>
    </Wrapper>
  );
};
export default Form_AC;