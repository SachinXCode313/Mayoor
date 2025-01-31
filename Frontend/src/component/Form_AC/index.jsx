import React, { useState } from "react";
import Wrapper from "./style";
import axios from "axios";

const Form_AC = ({ closeForm, userData, loadAC }) => {
  const [acName, setAcName] = useState("");
  const [maxMarks, setMaxMarks] = useState("");

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
        "http://10.33.0.41:8000/api/assessment-criteria",
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

  return (
    <Wrapper>
      <h3>Add New Assessment Criteria</h3>
      <input
        type="text"
        placeholder="Enter AC Name"
        value={acName}
        onChange={(e) => setAcName(e.target.value)}
        className="input"
      />
      <input
        type="number"
        placeholder="Enter Maximum Marks"
        value={maxMarks}
        onChange={(e) => setMaxMarks(e.target.value)}
        className="input"
      />
      <div className="buttons">
        <button onClick={handleSubmit} className="savebtn">Submit</button>
        <button onClick={closeForm} className="closebtn">Cancel</button>
      </div>
    </Wrapper>
  );
};

export default Form_AC;