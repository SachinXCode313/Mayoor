import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Delete from "../images/delete2.png";
import Edit from "../images/edit2.png";
import List from "../images/list.png";
import axios from "axios";
import Form_AC from "../Form_AC";
import Assessment from "../Start_Assesment/index.jsx";
import bellIcon from "../assets/bell.png";
import userIcon from "../assets/user.png";
import menuIcon from "../assets/menu.png";

const AC_List = ({acItems, setAcItems, handleAcItems, studentsData , setIndex}) => {
  const [acList, setAcList] = useState([]);  
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAcList, setFilteredAcList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);

  const handleClick = () => {
    setIndex(1)
  }
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
      }
    };
    

  useEffect(() => {
    loadAC();
  }, [userData]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredAcList(acList);
    } else {
      const filteredData = acList.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAcList(filteredData);
    }
  }, [searchQuery, acList]);

  const handleStartAssessment = (item) => {
    setSelectedAssessment(item);
  };

  const handleBackToList = () => {
    setSelectedAssessment(null);
  };

  if (selectedAssessment) {
    return <Assessment selectedAssessment={selectedAssessment} onBack={handleBackToList} studentsData={studentsData}/>;
  }

  return (
    <Wrapper>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search AC..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar"
        />
        <div className="icon">
            <img src={bellIcon} alt="Bell Icon" style={{ width: "22px", height: "22px" }} />
            <img src={userIcon} alt="User Icon" style={{ width: "22px", height: "22px" }} />
            <img className="menu" src={menuIcon} alt="Menu Icon" style={{ width: "22px", height: "31px" }} onClick={handleClick} />
        </div>
      </div>

      {filteredAcList.length > 0 ? (
        <ul className="ac-list">
          {filteredAcList.map((item) => (
            <li key={item.id} className="ac-list-item" onClick={() => handleStartAssessment(item)}>
              <div className="ac-header">
                <div className="list-icon-containers">
                  <img src={List} alt="" className="list-icons" />
                </div>
                <div className="ac-info">
                  <p className="item-title">{item.name}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="no-results">
          <p className="no_results">No Results Found</p>
        </div>
      )}

      <div className="add" onClick={() => setShowForm(true)}>+</div>

      {showForm && (
        <div className="popup-overlay">
          <div className="popup-content">
            <Form_AC closeForm={() => setShowForm(false)} userData={userData} loadAC={loadAC} />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default AC_List;