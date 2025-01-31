import React, { useState } from 'react';
import Wrapper from './style';
import axios from "axios";

const Form_LO = ({ closeForm, userData, loadLO }) => {
  const [loInput, setLoInput] = useState('');

  const handleSave = async () => {
    if (loInput.trim() === '') {
      alert('Please enter a valid LO!');
      return;
    }

    try {
      const headers = {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with the actual token
        'Content-Type': 'application/json',
        classname : userData.class,
        year: userData.year,
        subject: userData.subject,
        quarter: userData.quarter,
      };

      const body = {
        name: loInput, // Only the name is required in the body
      };

      console.log('Headers:', headers);
      console.log('Body:', body);

      const response = await axios.post(
        'http://10.33.0.41:8000/api/learning-outcome',
        body,
        { headers }
      );

      if (response.status === 201) {
        alert('LO successfully added!');
        loadLO(userData)
      } else {
        console.warn('Unexpected response:', response);
        alert('Failed to add LO. Please try again!');
      }
    } catch (error) {
      console.error('Error adding new LO:', error.response || error.message);
      alert('Failed to add LO. Please try again!');
    }

    closeForm(); // Close the form after submission
  };

  return (
    <Wrapper>
      <div className="form-container">
        <p>Enter the LO you want to add :</p>
        <input
          type="text"
          placeholder="LO Input"
          className="input"
          value={loInput}
          onChange={(e) => setLoInput(e.target.value)}
        />
        <div className="buttons">
          <input
            type="button"
            value="Save"
            className="savebtn"
            onClick={handleSave}
          />
          <input
            type="button"
            value="Close"
            className="closebtn"
            onClick={closeForm}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Form_LO;