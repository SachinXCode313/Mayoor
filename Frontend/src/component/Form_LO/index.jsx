import React, { useState , useEffect} from 'react';
import Wrapper from './style';
import axios from "axios";

const Form_LO = ({ closeForm, loadLO }) => {
  const [loInput, setLoInput] = useState('');

  const [userData, setUserData] = useState(null);
      useEffect(() => {
        const userData = sessionStorage.getItem("userData");
        if (userData) {
          setUserData(JSON.parse(userData));
        }
      }, []);
  const handleSubmit = async () => {
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
        `${process.env.REACT_APP_API_URL}/api/learning-outcome`,
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
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(); // Trigger form submission when Enter is pressed
    }
  };

  return (
    <Wrapper>
      <div className="form-container">
        <p>Enter the LO you want to add :</p>
        <input
          type="text"
          placeholder="Enter Learning Outcome"
          className="input"
          value={loInput}
          onChange={(e) => setLoInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <div className="buttons">
          <input
            type="button"
            value="Close"
            className="closebtn"
            onClick={closeForm}
          />
            <input
            type="button"
            value="Submit"
            className="submitbtn"
            onClick={handleSubmit}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default Form_LO;