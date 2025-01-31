import React, { useState, useEffect } from "react";
import Wrapper from "./style";
import Delete from "../images/delete2.png";
import Edit from "../images/edit2.png";
import List from "../images/list.png";
import axios from "axios";
import Form_AC from "../Form_AC";
import Assessment from "../Start_Assesment/index.jsx";
const AC_List = ({ userData }) => {
  const [acList, setAcList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectedAssessment, setSelectedAssessment] = useState(null);
  const loadAC = async () => {
    if (!userData.year || !userData.class || !userData.section || !userData.subject || !userData.quarter) {
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
      const response = await axios.get("http://10.33.0.41:8000/api/assessment-criteria", { headers });
      const data = response.data;
      if (Array.isArray(data.assessments)) {
        setAcList(data.assessments);
        localStorage.setItem("acList", JSON.stringify(data.assessments));
      } else {
        setAcList([]);
        console.warn("Unexpected API response format:", data);
      }
    } catch (error) {
      console.error("Error fetching assessment criteria:", error.response?.data || error.message);
      setAcList([]);
    }
  };
  useEffect(() => {
    const storedACList = localStorage.getItem("acList");
    if (storedACList) {
      setAcList(JSON.parse(storedACList));
    } else {
      loadAC();
    }
  }, [userData]);
  const handleStartAssessment = (item) => {
    console.log("Item clicked:", item);
    setSelectedAssessment(item);
  };
  const handleBackToList = () => {
    setSelectedAssessment(null);
  };
  if (selectedAssessment) {
    return <Assessment selectedAssessment={selectedAssessment} onBack={handleBackToList} />;
  }
  return (
    <Wrapper>
      <h2 className="ac-list-title">AC List</h2>
      <ul className="ac-list">
        {acList.map((item, index) => (
          <li key={item.id} className="ac-list-item" onClick={() => handleStartAssessment(item)}>
            <div className="ac-header">
              <div className="list-icon-container">
                <img src={List} alt="" className="list-icon" />
              </div>
              <div className="ac-info">
                <p className="item-title">{item.name}</p>
              </div>
              {/* <img src={Edit} alt="edit" className="edit" />
              <img src={Delete} alt="delete" className="delete" /> */}
            </div>
          </li>
        ))}
      </ul>
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