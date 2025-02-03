import React, { useState , useEffect} from "react";
import Wrapper from "./style";
import axios from "axios";

const Form_AC = ({ closeForm, loadAC }) => {
  const [acName, setAcName] = useState("");
  const [maxMarks, setMaxMarks] = useState("");

  const [userData, setUserData] = useState(null);
      useEffect(() => {
        const userData = sessionStorage.getItem("userData");
        if (userData) {
          setUserData(JSON.parse(userData));
        }
      }, []);
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
      <h3>Add New Assessment Criteria</h3>
      <input
        type="text"
        placeholder="Enter Assessment Criteria"
        value={acName}
        onChange={(e) => setAcName(e.target.value)}
        className="input"
        onKeyDown={handleKeyDown} // Listen for Enter key press
      />
      <input
        type="number"
        placeholder="Enter Maximum Marks"
        value={maxMarks}
        onChange={(e) => setMaxMarks(e.target.value)}
        className="input"
        onKeyDown={handleKeyDown} // Listen for Enter key press
      />
      <div className="buttons">
        <button onClick={closeForm} className="closebtn">Cancel</button>
        <button onClick={handleSubmit} className="savebtn">Submit</button>
      </div>
    </Wrapper>
  );
};

export default Form_AC;