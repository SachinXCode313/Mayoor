import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Delete from '../images/delete2.png';
import Edit from '../images/edit2.png';
import ACMapping from "../LO_AC_Mapping";
import List from '../images/list.png';
import axios from "axios";
import Form_LO from "../Form_LO";
import bellIcon from "../assets/bell.png";
import userIcon from "../assets/user.png";
import menuIcon from "../assets/menu.png";

const LOlist = ({ acItems, setAcItems, userData }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [loList, setLoList] = useState([]);      
  const [searchQuery, setSearchQuery] = useState(""); 
  const [filteredLoList, setFilteredLoList] = useState([]); 
  const [showForm, setShowForm] = useState(false);

  const toggleDropdown = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleform = () => {
    setShowForm(true);
  };

  const loadLO = async (userData) => {
    const headers = {
      Authorization: 'Bearer YOUR_ACCESS_TOKEN',
      'Content-Type': 'application/json',
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };

    console.log("Headers:", headers);
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/learning-outcome`, { headers });
      const data = response.data;

      console.log("API Response Data:", data);

      let finalData = [];
      if (Array.isArray(data)) {
        finalData = data;
      } else if (Array.isArray(data.ro)) {
        finalData = data.ro;
      } else if (Array.isArray(data.lo)) {
        finalData = data.lo;
      } else {
        console.warn("Unexpected API response format:", data);
      }

      localStorage.setItem('loList', JSON.stringify(finalData));
      setLoList(finalData);
      setFilteredLoList(finalData);

    } catch (error) {
      console.error("Error fetching report outcomes:", error.response || error.message);
      setLoList([]);
      setFilteredLoList([]);
    }
  };

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      loadLO(userData);
    } else {
      console.warn("userData is empty or undefined:", userData);
    }
  }, [userData]);

  // Load data from localStorage on initial load
  useEffect(() => {
    const savedLoList = localStorage.getItem('loList');
    if (savedLoList) {
      setLoList(JSON.parse(savedLoList));
      setFilteredLoList(JSON.parse(savedLoList));
    }
  }, []);

  // Search filter logic
  useEffect(() => {
    if (!searchQuery) {
      setFilteredLoList(loList);
    } else {
      const filteredData = loList.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLoList(filteredData);
    }
  }, [searchQuery, loList]);

  return (
    <Wrapper>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search LO..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <div className="icon">
            <img src={bellIcon} alt="Bell Icon" style={{ width: "22px", height: "22px" }} />
            <img src={userIcon} alt="User Icon" style={{ width: "22px", height: "22px" }} />
            <img className="menu" src={menuIcon} alt="Menu Icon" style={{ width: "22px", height: "31px" }} />
        </div>
      </div>

      {filteredLoList.length > 0 ? (
        <ul className="lo-list">
          {filteredLoList.map((item, index) => (
            <li key={item.id} className="lo-list-item">
              <div className="lo-header" onClick={() => toggleDropdown(index)}>
                <div className="list-icon-containers">
                  <img src={List} alt="" className="list-icons" />
                </div>
                <div className="lo-info">
                  <p className="item-title">{item.name}</p>
                </div>
              </div>

              <div className={activeIndex === index ? "show lo-dropdown-content" : "lo-dropdown-content"}>
                <ACMapping acItems={acItems} setAcItems={setAcItems} userData={userData} loList={loList} loId={item.id} />
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-results">
          <p className="no_results">No Results Found</p>
        </div>
      )}

      <div className="add" onClick={handleform}>+</div>
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Form_LO closeForm={() => setShowForm(false)} userData={userData} loadLO={loadLO} />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default LOlist;