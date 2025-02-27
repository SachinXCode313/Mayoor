import React, { useState, useEffect } from 'react';
import Wrapper from './style';
import ACMapping from '../LO_AC_Mapping';
import List from '../images/list.png';
import axios from 'axios';
import Form_LO from '../Form_LO';
import MenuDots from '../MenuDots';
import Menu from '../MenuBar';

const LOlist = ({ acItems, setAcItems, loItems, setLoItems, handleLoItems, setIndex }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null); // For three-dot menu state
  const [filteredLoList, setFilteredLoList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [acList, setAcList] = useState([]);
  const [filteredAcList, setFilteredAcList] = useState([]);

  const handleClick = () => setIndex(1);

  const toggleDropdown = (index) => {
    if (activeMenuIndex !== null) {
      return; // Prevent toggling when MenuDots is open
    }
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };
  

  const handleProfileClick = () => alert("Go to Profile");
  const handleSettingsClick = () => alert("Open Settings");
  const handleLogoutClick = () => alert("Logging Out...");

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

  const loadLO = async (userData) => {
    setLoading(true);
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
    } finally {
      setLoading(false);
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

  const loadAC = async () => {
    if (!userData || !userData.year || !userData.class || !userData.section || !userData.subject || !userData.quarter) {
      console.warn("Missing user data, skipping API call.");
      return;
    }
    setLoading(true);

    const headers = {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      "Content-Type": "application/json",
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
    };

    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/assessment-criteria`, { headers });
      console.log("Response Data:", response.data);
      const data = response.data;

      if (Array.isArray(data.assessments)) {
        setAcList(data.assessments);
        setFilteredAcList(data.assessments);
        setAcItems(data.assessments);
      } else {
        setAcList([]);
        setFilteredAcList([]);
        setAcItems([]);
        console.warn("Unexpected API response format:", data);
      }
    } catch (error) {
      console.error("Error fetching assessment criteria:", error.response?.data || error.message);
      setAcList([]);
      setFilteredAcList([]);
      setAcItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAC();
  }, [userData]);

  const handleDelete = async (loId) => {
    if (!window.confirm("Are you sure you want to delete this Learning Outcome?")) {
      return;
    }
  
    setLoading(true);
    
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      "Content-Type": "application/json",
      year: userData.year,
      classname: userData.class,
      section: userData.section,
      subject: userData.subject,
      quarter: userData.quarter,
      };
  
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/learning-outcome/${loId}`, { headers });
  
      // Update the list after deletion
      const updatedLoItems = loItems.filter(item => item.id !== loId);
      setLoItems(updatedLoItems);
      setFilteredLoList(updatedLoItems);
  
      alert("Learning Outcome deleted successfully.");
    } catch (error) {
      console.error("Error deleting Learning Outcome:", error.response?.data || error.message);
      alert("Failed to delete Learning Outcome. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  const handleEdit = async (loId, updatedName) => {
    const newName = prompt("Enter new name for Learning Outcome:", updatedName);
    if (!newName || newName.trim() === "") {
      alert("Name cannot be empty.");
      return;
    }
  
    setLoading(true);
  
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        "Content-Type": "application/json",
        year: userData.year,
        classname: userData.class,
        section: userData.section,
        subject: userData.subject,
        quarter: userData.quarter,
      };
  
      const requestBody = { name: newName };
  
      await axios.put(`${process.env.REACT_APP_API_URL}/api/learning-outcome/${loId}`, requestBody, { headers });
  
      // Update local state
      const updatedLoItems = loItems.map(item =>
        item.id === loId ? { ...item, name: newName } : item
      );
      
      setLoItems(updatedLoItems);
      setFilteredLoList(updatedLoItems);
  
      alert("Learning Outcome updated successfully.");
    } catch (error) {
      console.error("Error updating Learning Outcome:", error.response?.data || error.message);
      alert("Failed to update Learning Outcome. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Wrapper>
      <div className="search-container">
      <div className="icon">
          <Menu
            onProfileClick={handleProfileClick}
            onSettingsClick={handleSettingsClick}
            onLogoutClick={handleLogoutClick}
            onReturnClick={handleClick}
          />
        </div>
        <input
          type="text"
          placeholder="Search LO..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>
      <ul className="lo-list">
        {loading ? (
          <li>
            <p className="loading-message">Loading....</p>
          </li>
        ) : filteredLoList.length > 0 ? (
          filteredLoList.map((item, index) => (
            <li key={item.id} className={`lo-list-item ${activeIndex === index ? 'active' : ''}`}>
              <div className="lo-header" onClick={() => toggleDropdown(index)}>
                <div className="list-icon-containers">
                  <img src={List} alt="" className="list-icons" />
                </div>
                <div className="lo-info">
                  <p className="item-title">{item.name}</p>
                </div>
                <div className='mapCounter'>1</div>
                <div>
                  <MenuDots
                    index={index}
                    activeMenuIndex={activeMenuIndex}
                    setActiveMenuIndex={setActiveMenuIndex}
                    onEditClick={() => handleEdit(item.id, item.name)}
                    onDeleteClick={() => handleDelete(item.id)}
                  />
                </div>
              </div>
              <div className={`lo-dropdown-content ${activeIndex === index ? 'show' : 'hide'}`}>
                {activeIndex === index && (
                  <ACMapping acItems={acItems} setAcItems={setAcItems} loId={item.id} acList={acList} setAcList={setAcList}/>
                )}
              </div>
            </li>
          ))
        ) : (
          <li className="no-results">
            <p className="no_results">No Results Found</p>
          </li>
        )}
      </ul>
      <div className="add" onClick={() => setShowForm(true)}><span className='plus'>+</span></div>
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
