import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import List from "../images/list.png";
import axios from "axios";
import Form_AC from "../Form_AC";
import Assessment from "../Start_Assesment/index.jsx";
import Menu from "../MenuBar/index.jsx";
import MenuDots from "../MenuDots/index.jsx";

const AC_List = ({ acItems, setAcItems, handleAcItems, studentsData, setIndex, user }) => {
  const [acList, setAcList] = useState([]);
  const [activeMenuIndex, setActiveMenuIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAcList, setFilteredAcList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setIndex(1);
  };

  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const userData = sessionStorage.getItem("userData");
    if (userData) {
      setUserData(JSON.parse(userData));
    }
  }, []);

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

  useEffect(() => {
    if (!searchQuery) {
      setFilteredAcList(acList);
    } else {
      const filteredData = acList.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAcList(filteredData);
    }
  }, [searchQuery, acList]);

  // ✅ Prevents opening Assessment when MenuDots is active
  const handleStartAssessment = (item) => {
    if (activeMenuIndex !== null) {
      return; // If menu is open, do nothing
    }
    setSelectedAssessment(item);
  };

  const handleBackToList = () => {
    setSelectedAssessment(null);
  };

  if (selectedAssessment) {
    return <Assessment selectedAssessment={selectedAssessment} onBack={handleBackToList} studentsData={studentsData} />;
  }

  const handleDelete = async (acId) => {
    if (!window.confirm("Are you sure you want to delete this Assessment Criteria?")) {
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
  
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/assessment-criteria/${acId}`, { headers });
  
      const updatedAcItems = acItems.filter(item => item.id !== acId);
      setAcItems(updatedAcItems);
      setFilteredAcList(updatedAcItems);
  
      alert("Assessment Criteria deleted successfully.");
    } catch (error) {
      console.error("Error deleting Assessment Criteria:", error.response?.data || error.message);
      alert("Failed to delete Assessment Criteria. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (acId, updatedName) => {
    const newName = prompt("Enter new name for Assessment Criteria:", updatedName);
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
  
      await axios.put(`${process.env.REACT_APP_API_URL}/api/assessment-criteria/${acId}`, requestBody, { headers });
  
      const updatedAcItems = acItems.map(item =>
        item.id === acId ? { ...item, name: newName } : item
      );
      
      setAcItems(updatedAcItems);
      setFilteredAcList(updatedAcItems);
  
      alert("Assessment Criteria updated successfully.");
    } catch (error) {
      console.error("Error updating Assessment Criteria:", error.response?.data || error.message);
      alert("Failed to update Assessment Criteria. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <div className="search-container">
      <div className="icon">
          <Menu
            onProfileClick={() => alert("Go to Profile")}
            onSettingsClick={() => alert("Open Settings")}
            onLogoutClick={() => alert("Logging Out...")}
            onReturnClick={handleClick}
          />
        </div>
        <input
          type="text"
          placeholder="Search AC..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
      </div>

      <ul className="ac-list">
        {loading ? (
          <li>
            <p className="loading-message">Loading....</p>
          </li>
        ) : filteredAcList.length > 0 ? (
          filteredAcList.map((item, index) => (
            <li key={item.id} className="ac-list-item" onClick={() => handleStartAssessment(item)}>
              <div className="ac-header">
                <div className="list-icon-containers">
                  <img src={List} alt="" className="list-icons" />
                </div>
                <div className="ac-info">
                  <p className="item-title">{item.name}</p>
                </div>
                <div className='mapCounter'>1</div>
                <div>
                  <MenuDots
                    index={index}
                    activeMenuIndex={activeMenuIndex}
                    setActiveMenuIndex={(index) => {
                      setSelectedAssessment(null); // Close Assessment when menu is clicked
                      setActiveMenuIndex(index);
                    }}
                    onEditClick={() => handleEdit(item.id, item.name)}
                    onDeleteClick={() => handleDelete(item.id)}
                  />
                </div>
              </div>
            </li>
          ))
        ) : (
          <li className="no-results">
            <p className="no_results">No Data Available</p>
          </li>
        )}
      </ul>
      <div className="add" onClick={() => setShowForm(true)}><span className='plus'>+</span></div>
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Form_AC closeForm={() => setShowForm(false)} />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default AC_List;
