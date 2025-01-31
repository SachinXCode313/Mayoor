import React, { useState } from 'react';  
import styled from 'styled-components';  

const AppContainer = styled.div`  
  background-color: #fff;  
  border-radius: 10px;  
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);  
  overflow: hidden;  
  display: flex;  
  flex-direction: column;  
  align-items: stretch;  
  width: 100%;  
  max-width: 480px;  
  height: 100vh;  
  margin: 0 auto;  

  @media (min-width: 768px) {  
    max-width: 800px; /* Adjust max-width for larger screens */  
      border-radius: 15px;  
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);  
  }  

  @media (min-width: 1024px) {  
     max-width: 900px;  
      border-radius: 20px;  
      box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);  
  }  
`;  

const Header = styled.div`  
  background-color: #20c997;  
  color: white;  
  padding: 10px 15px;  
  display: flex;  
  justify-content: space-between;  
  align-items: center;  
  font-size: 1.2rem;  
  position: sticky;  
  top: 0;  
  z-index: 100;  

  @media (min-width: 768px) {  
    padding: 15px 20px;  
    font-size: 1.4rem;  
  }  
`;  

const HeaderTitle = styled.span`  
  font-weight: bold;  
`;  

const NavButton = styled.button`  
  background: none;  
  border: none;  
  font-size: 1.5rem;  
  color: white;  
  cursor: pointer;  

    @media (min-width: 768px) {  
        font-size: 1.8rem;  
    }  
`;  

const ContentContainer = styled.div`  
    padding: 15px;  
    display: flex;  
    flex-direction: column;  
    gap: 10px;  
    overflow-y: auto;  
    flex: 1;  
    width: 100%;  
    box-sizing: border-box;  

    @media (min-width: 768px) {  
        padding: 20px;  
    }  
`;  


const ProfileCard = styled.div`  
    background-color: #f9f9f9;  
    padding: 15px;  
    border-radius: 8px;  
    display: flex;  
    align-items: center;  
    gap: 15px;  
    flex-wrap: wrap;  

     @media (min-width: 768px) {  
        padding: 20px;  
         border-radius: 12px;  
        gap: 20px;  
    }  
`;  

const ProfilePic = styled.img`  
  width: 60px;  
  height: 60px;  
  border-radius: 50%;  
  object-fit: cover;  

    @media (min-width: 768px) {  
        width: 80px;  
        height: 80px;  
    }  
`;  

const ProfileInfo = styled.div`  
  flex-grow: 1;  
  display: flex;  
  flex-direction: column;  
  gap: 5px;  
`;  

const ProfileRow = styled.div`  
    display: flex;  
    gap: 10px;  
    font-size: 0.9rem;  
    flex-wrap: wrap;  

     @media (min-width: 768px) {  
        font-size: 1rem;  
    }  
`;  

const Label = styled.span`  
  font-weight: bold;  
`;  

const Value = styled.span`  
  flex-grow: 1;  
`;  

const LanguageDropdown = styled.div`  
  margin-bottom: 10px;  
  text-align: right;  
`;  

const LanguageSelect = styled.select`  
  padding: 8px;  
  border: 1px solid #ddd;  
  border-radius: 5px;  
  background-color: white;  
  cursor: pointer;  
    @media (min-width: 768px) {  
        padding: 10px;  
        font-size: 1rem;  
    }  
`;  

const TableContainer = styled.div`  
  overflow-x: auto;  
`;  

const ScoresTable = styled.table`  
  width: 100%;  
  border-collapse: collapse;  
  margin-top: 10px;  
  border: 1px solid #ddd;  
  border-radius: 8px;  
    @media (min-width: 768px) {  
        border-radius: 12px;  
    }  
`;  

const TableHeaderCell = styled.th`  
  border: 1px solid #ddd;  
  padding: 8px;  
  text-align: left;  
  font-size: 0.9rem;  
  background-color: #f0f0f0;  
  font-weight: bold;  

    @media (min-width: 768px) {  
        padding: 10px;  
        font-size: 1rem;  
    }  
`;  

const TableDataCell = styled.td`  
  border: 1px solid #ddd;  
  padding: 8px;  
  text-align: left;  
  font-size: 0.9rem;  

   @media (min-width: 768px) {  
        padding: 10px;  
        font-size: 1rem;  
    }  
`;  

const Wrapper = styled.div`  
    font-family: sans-serif;  
      margin: 0;  
      padding: 0;  
      background-color: #f0f0f0;  
      display: flex;  
      justify-content: center;  
      align-items: center;  
      min-height: 100vh;  
  `  
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
      { acList: 'AC 1', scores: '4.02/10' },  
      { acList: 'AC 2', scores: '10/10' },  
      { acList: 'AC 3', scores: '20/20' },  
      { acList: 'AC 4', scores: '20/40' },  
      { acList: 'AC 5', scores: '30/30' },  
      { acList: 'AC 6', scores: '10/10' },  
      { acList: 'AC 7', scores: '40/50' },
      { acList: 'AC 8', scores: '40/50' },
      { acList: 'AC 9', scores: '40/50' },
      { acList: 'AC 10', scores: '40/50' },
      { acList: 'AC 11', scores: '40/50' },
      { acList: 'AC 12', scores: '40/50' },  
    ]);  

    const [currentLanguage, setCurrentLanguage] = useState('English');  
    
    const handleLanguageChange = (event) => {  
      setCurrentLanguage(event.target.value);  
    };  

  return (  
    <Wrapper>  
      <AppContainer>  
        <Header>  
          <NavButton>&lt;</NavButton>  
          <HeaderTitle>AC Scores</HeaderTitle>  
          <NavButton>&gt;</NavButton>  
        </Header>  
    
        <ContentContainer>  
          <ProfileCard>  
            <ProfilePic src={profileData.profilePic} alt="Profile" />  
            <ProfileInfo>  
              <ProfileRow>  
                <Label>Name:</Label>  
                <Value>{profileData.name}</Value>  
                <Label>Section:</Label>  
                <Value>{profileData.section}</Value>  
              </ProfileRow>  
              <ProfileRow>  
                <Label>Roll No:</Label>  
                <Value>{profileData.rollNo}</Value>  
                <Label>Quarter:</Label>  
                <Value>{profileData.quarter}</Value>  
              </ProfileRow>  
              <ProfileRow>  
                <Label>Grade:</Label>  
                <Value>{profileData.grade}</Value>  
              </ProfileRow>  
            </ProfileInfo>  
          </ProfileCard>  
             
          <TableContainer>  
            <ScoresTable>  
              <thead>  
                <tr>  
                  <TableHeaderCell>AC List</TableHeaderCell>  
                  <TableHeaderCell>Scores</TableHeaderCell>  
                </tr>  
              </thead>  
              <tbody>  
                {scoresData.map((item, index) => (  
                  <tr key={index}>  
                    <TableDataCell>{item.acList}</TableDataCell>  
                    <TableDataCell>{item.scores}</TableDataCell>  
                  </tr>  
                ))}  
              </tbody>  
            </ScoresTable>  
          </TableContainer>  
        </ContentContainer>  
      </AppContainer>  
    </Wrapper>  
  );  
};  

export default StudentList;