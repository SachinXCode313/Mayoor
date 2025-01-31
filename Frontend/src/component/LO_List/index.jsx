import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Delete from '../images/delete2.png';
import Edit from '../images/edit2.png';
import ACMapping from "../LO_AC_Mapping";
import List from '../images/list.png';
import axios from "axios";
import Form_LO from "../Form_LO";

const LOlist = ({acItems, setAcItems, userData }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [loList, setLoList] = useState([]);

  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [showForm, setShowForm] = useState(false);
  const handleform = () => {
    setShowForm(true); // Set to true when button is clicked
  };

  // Load Learning Outcomes from API and store them in localStorage
  const loadLO = async (userData) => {
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with the actual token
      'Content-Type': 'application/json',
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };

    console.log("Headers:", headers);

    try {
      const response = await axios.get('http://10.33.0.41:8000/api/learning-outcome', { headers });
      const data = response.data;

      console.log("API Response Data:", data);

      if (Array.isArray(data)) {
        // Store the response data in localStorage
        localStorage.setItem('loList', JSON.stringify(data));
        setLoList(data);
      } else if (Array.isArray(data.ro)) {
        // Store the response data in localStorage
        localStorage.setItem('loList', JSON.stringify(data.ro));
        setLoList(data.ro);
      } else if (Array.isArray(data.lo)) {
        // Store the response data in localStorage
        localStorage.setItem('loList', JSON.stringify(data.lo));
        setLoList(data.lo);
      } else {
        console.warn("Unexpected API response format:", data);
        setLoList([]);
      }
    } catch (error) {
      console.error("Error fetching report outcomes:", error.response || error.message);
      setLoList([]);
    }
  };

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      loadLO(userData); // Ensure userData is passed correctly
    } else {
      console.warn("userData is empty or undefined:", userData);
    }
  }, [userData]);

  // Load data from localStorage on initial load
  useEffect(() => {
    const savedLoList = localStorage.getItem('loList');
    if (savedLoList) {
      setLoList(JSON.parse(savedLoList)); // Retrieve and set data from localStorage
    }
  }, []);

  // console.log('user data in lo:', userData);

  return (
    <Wrapper>
      <h2 className="lo-list-title">LO List</h2>
      <ul className="lo-list">
        {loList.map((item, index) => (
          <li key={item.id} className="lo-list-item">
            <div className="lo-header" onClick={() => toggleDropdown(index)}>
              <div className="list-icon-container">
                <img src={List} alt="" className="list-icon" />
              </div>
              <div className="lo-info">
                <p className="item-title">{item.name}</p>
              </div>
              {/* <img src={Edit} alt="edit" className="edit" />
              <img
                src={Delete}
                alt="delete"
                className="delete"
                //onClick={(event) => deleteItem(item.id, event)}
              /> */}
            </div>
            
              <div className={activeIndex === index ? "show lo-dropdown-content" : "lo-dropdown-content"}>
                <ACMapping acItems={acItems} setAcItems={setAcItems} userData={userData} loList={loList} loId={item.id} />
              </div>
            
          </li>
        ))}
      </ul>
      <div className="add" onClick={handleform}>+</div>
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Form_LO closeForm={() => setShowForm(false)} userData={userData} loadLO={loadLO}/>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default LOlist;