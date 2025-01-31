import React, { useState, useEffect } from 'react';
import Wrapper from './style';
import LOMapping from '../RO_LO_Mapping';
import List from '../images/list.png';
import axios from 'axios';

const ROlist = ({ loItems, setLoItems, userData }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [roList, setRoList] = useState([]);

  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    const loadRO = async (userdata) => {
      const headers = {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with the actual token
        'Content-Type': 'application/json',
        year: userdata.year,
        classname: userdata.class,
        section: userdata.section,
        subject: userdata.subject,
      };
  
      try {
        const response = await axios.get('http://10.33.0.41:8000/api/report-outcome', { headers });
        const data = response.data;
  
        console.log('Response Data:', data);
  
        // Check if data has the expected structure
        if (data && Array.isArray(data.ro)) {
          setRoList(data.ro); // Use the `ro` array from the response
        } else {
          console.warn('Expected an array but received:', data);
          setRoList([]); // If not valid, set an empty array
        }
      } catch (error) {
        console.error('Error fetching report outcomes:', error.response || error.message);
        setRoList([]); // In case of an error, set an empty array
      }
    };
  
    if (Object.keys(userData).length > 0) {
      loadRO(userData);
    }
  }, [userData]); // Dependency on userData to trigger the effect
  

  // console.log('User data in RO:', userData);

  return (
    <Wrapper>
      <h2 className="ro-list-title">RO List</h2>
      <ul className="ro-list">
        {roList.map((item, index) => (
          <li key={item.id} className="ro-list-item">
            <div className="ro-header" onClick={() => toggleDropdown(index)}>
              <div className="list-icon-container">
                <img src={List} alt="" className="list-icon" />
              </div>
              <div className="ro-info">
                <p className="item-title">{item.name}</p>
              </div>
              <div className="ro-dropdown-icon">
                {activeIndex === index }
              </div>
            </div>
            {activeIndex === index && (
              <div className="ro-dropdown-content">
                <LOMapping loItems={loItems} setLoItems={setLoItems} userData={userData}/>
              </div>
            )}
          </li>
        ))}
      </ul>
    </Wrapper>
  );
};

export default ROlist;
