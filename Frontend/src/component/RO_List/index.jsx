import React, { useState, useEffect } from 'react';
import Wrapper from './style';
import LOMapping from '../RO_LO_Mapping';
import List from '../images/list.png';
import axios from 'axios';
import bellIcon from "../assets/bell.png";
import userIcon from "../assets/user.png";
import menuIcon from "../assets/menu.png";

const ROlist = ({ loItems, setLoItems, setIndex}) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [roList, setRoList] = useState([]);     // Full RO list from API
  const [searchQuery, setSearchQuery] = useState(""); // Stores search input
  const [filteredRoList, setFilteredRoList] = useState([]); // Filtered RO list

  const handleClick = () => {
    setIndex(1)
  }
  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const [userData, setUserData] = useState(null);
    useEffect(() => {
      const userData = sessionStorage.getItem("userData");
      if (userData) {
        setUserData(JSON.parse(userData));
      }
    }, []);

  useEffect(() => {
    const loadRO = async (userdata) => {
      const headers = {
        Authorization: 'Bearer YOUR_ACCESS_TOKEN', // Replace with actual token
        'Content-Type': 'application/json',
        year: userdata.year,
        classname: userdata.class,
        section: userdata.section,
        subject: userdata.subject,
      };

      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/report-outcome`, { headers });
        const data = response.data;

        console.log('Response Data:', data);

        if (data && Array.isArray(data.ro)) {
          setRoList(data.ro);
          setFilteredRoList(data.ro); // Initialize filtered list with full data
        } else {
          console.warn('Expected an array but received:', data);
          setRoList([]);
          setFilteredRoList([]);
        }
      } catch (error) {
        console.error('Error fetching report outcomes:', error.response || error.message);
        setRoList([]);
        setFilteredRoList([]);
      }
    };

    if (userData && Object.keys(userData).length > 0) {
      loadRO(userData);
    }
  }, [userData]);

  // Search filter logic
  useEffect(() => {
    if (!searchQuery) {
      setFilteredRoList(roList);
    } else {
      const filteredData = roList.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRoList(filteredData);
    }
  }, [searchQuery, roList]);

  return (
    <Wrapper>
      
      <div className="search-container">
        <input
          type="text"
          placeholder="Search RO..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <div className="icon">
            <img src={bellIcon} alt="Bell Icon" style={{ width: "22px", height: "22px" }} />
            <img src={userIcon} alt="User Icon" style={{ width: "22px", height: "22px" }} />
            <img className="menu" src={menuIcon} alt="Menu Icon" style={{ width: "22px", height: "31px" }} onClick={handleClick}/>
        </div>
      </div>

      {filteredRoList.length > 0 ? (
        <ul className="ro-list">
          {filteredRoList.map((item, index) => (
            <li key={item.id} className="ro-list-item">
              <div className="ro-header" onClick={() => toggleDropdown(index)}>
                <div className="list-icon-containers">
                  <img src={List} alt="" className="list-icons" />
                </div>
                <div className="ro-info">
                  <p className="item-title">{item.name}</p>
                </div>
              </div>
              {activeIndex === index && (
                <div className="ro-dropdown-content">
                  <LOMapping loItems={loItems} setLoItems={setLoItems} userData={userData} roId={item.id} />
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-results">
          <p className="no_results">No Results Found</p>
        </div> 
      )}
    </Wrapper>
  );
};

export default ROlist;