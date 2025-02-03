import React, { useState, useEffect } from 'react';
import Wrapper from './style';
import Delete from '../images/delete2.png';
import Edit from '../images/edit2.png';
import ACMapping from '../LO_AC_Mapping';
import List from '../images/list.png';
import axios from 'axios';
import Form_LO from '../Form_LO';
import bellIcon from '../assets/bell.png';
import userIcon from '../assets/user.png';
import menuIcon from '../assets/menu.png';

const LOlist = ({ acItems, setAcItems, loItems, setLoItems, handleLoItems, setIndex }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [filteredLoList, setFilteredLoList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleClick = () => {
    setIndex(1)
  }

  const toggleDropdown = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleform = () => {
    setShowForm(true);
  };

  const [userData, setUserData] = useState(null);
    useEffect(() => {
      const userData = sessionStorage.getItem("userData");
      if (userData) {
        setUserData(JSON.parse(userData));
      }
    }, []);
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

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/learning-outcome`, { headers });
      const data = response.data;

      let finalData = [];
      if (Array.isArray(data)) {
        finalData = data;
      } else if (Array.isArray(data.ro)) {
        finalData = data.ro;
      } else if (Array.isArray(data.lo)) {
        finalData = data.lo;
      }

      handleLoItems(finalData);
      setFilteredLoList(finalData);
    } catch (error) {
      console.error('Error fetching report outcomes:', error);
    }
  };

  useEffect(() => {
    if (userData && Object.keys(userData).length > 0) {
      loadLO(userData);
    }
  }, [userData]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredLoList(loItems);
    } else {
      const filteredData = loItems.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredLoList(filteredData);
    }
  }, [searchQuery, loItems]);

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
          <img src={bellIcon} alt="Bell Icon" style={{ width: '22px', height: '22px' }} />
          <img src={userIcon} alt="User Icon" style={{ width: '22px', height: '22px' }} />
          <img className="menu" src={menuIcon} alt="Menu Icon" style={{ width: '22px', height: '31px' }} onClick={handleClick}/>
        </div>
      </div>

      {filteredLoList.length > 0 ? (
        <ul className="lo-list">
          {filteredLoList.map((item, index) => (
            <li key={item.id} className={`lo-list-item ${activeIndex === index ? 'active' : ''}`}>
              <div className="lo-header" onClick={() => toggleDropdown(index)}>
                <div className="list-icon-containers">
                  <img src={List} alt="" className="list-icons" />
                </div>
                <div className="lo-info">
                  <p className="item-title">{item.name}</p>
                </div>
              </div>
              <div className={`lo-dropdown-content ${activeIndex === index ? 'show' : 'hide'}`}>
                {activeIndex === index && (
                  <ACMapping acItems={acItems} setAcItems={setAcItems} loId={item.id} />
                )}
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
            <Form_LO closeForm={() => setShowForm(false)} loadLO={loadLO} />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default LOlist;