import React, { useState } from 'react';  
import './lcScores.css';  

const StudentList = () => {  
  const [profileData] = useState({  
      name: 'Kavya Goyal',  
      section: 'Tulip',  
      rollNo: 24001,  
      quarter: 'Q2',  
      grade: 'V',  
      profilePic: 'https://i.pravatar.cc/150',  
    });  

    const [scoresData] = useState([  
      { acList: 'LO 1', scores: '4.02/10' },  
      { acList: 'LO 2', scores: '10/10' },  
      { acList: 'LO 3', scores: '20/20' },  
      { acList: 'LO 4', scores: '20/40' },  
      { acList: 'LO 5', scores: '30/30' },  
      { acList: 'LO 6', scores: '10/10' },  
      { acList: 'LO 7', scores: '40/50' },
      { acList: 'LO 8', scores: '40/50' },
      { acList: 'LO 9', scores: '40/50' },
      { acList: 'LO 10', scores: '40/50' },
      { acList: 'LO 11', scores: '40/50' },
      { acList: 'LO 12', scores: '40/50' },  
    ]);  

    const [currentLanguage, setCurrentLanguage] = useState('English');  
    const handleLanguageChange = (event) => {  
      setCurrentLanguage(event.target.value);  
    };  

  return (  
    <div className="Wrapper">  
      <div className="AppContainer">  
        <div className="Header">  
          <button className="NavButton">&lt;</button>  
          <span className="HeaderTitle">LO Scores</span>  
          <button className="NavButton">&gt;</button>  
        </div>  
    
        <div className="ContentContainer">  
          <div className="ProfileCard">  
            <img className="ProfilePic" src={profileData.profilePic} alt="Profile" />  
            <div className="ProfileInfo">  
              <div className="ProfileRow">  
                <span className="Label">Name:</span>  
                <span className="Value">{profileData.name}</span>  
                <span className="Label">Section:</span>  
                <span className="Value">{profileData.section}</span>  
              </div>  
              <div className="ProfileRow">  
                <span className="Label">Roll No:</span>  
                <span className="Value">{profileData.rollNo}</span>  
                <span className="Label">Quarter:</span>  
                <span className="Value">{profileData.quarter}</span>  
              </div>  
              <div className="ProfileRow">  
                <span className="Label">Grade:</span>  
                <span className="Value">{profileData.grade}</span>  
              </div>  
            </div>  
          </div>  
            
          <div className="TableContainer">  
            <table className="ScoresTable">  
              <thead>  
                <tr>  
                  <th className="TableHeaderCell">AC List</th>  
                  <th className="TableHeaderCell">Scores</th>  
                </tr>  
              </thead>  
              <tbody>  
                {scoresData.map((item, index) => (  
                  <tr key={index}>  
                    <td className="TableDataCell">{item.acList}</td>  
                    <td className="TableDataCell">{item.scores}</td>  
                  </tr>  
                ))}  
              </tbody>  
            </table>  
          </div>  
        </div>  
      </div>  
    </div>  
  );  
};  

export default StudentList;