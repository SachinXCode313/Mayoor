
import styled from "styled-components";  

const Wrapper = styled.div`  
  font-family: sans-serif;  
  margin:0;  
  padding: 0;  
  background-color:#fff;  
  display: flex;  
  justify-content: space-between;  
   min-height: 100vh;  
  .AppContainer {  
    background-color:  #21C3BC;  
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);   
    display: flex;  
    flex-direction: column;  
    align-items: stretch;  
    width: 100vw;   
    height: 100vh;  
    margin: 0 auto;  
  }  
   
  
  @media (min-width: 768px) {  
    .Header {  
      padding: 15px 20px;  
      font-size: 1.4rem;  
    }  
  }  
   .Header {  
    display: flex; 
    justify-content:right; 
   aline-content:center;  
    padding: 10px 15px;  
    font-size: 1.2rem;  
    color: black;  
    box-sizing: border-box;  
    width: 100%;  
    position: sticky;  
    top: 0;  
    background-color: #21C3BC;  
    z-index: 10;  
  }  
   
    .HeaderImage {
    aline-item: right;
  height: 20px;  
  width: 20px;  
  margin-left: 10px; 

}  
  .NavButton {  
    background: none;  
    border: none;  
    font-size: 1.5rem;  
    color: white;  
    cursor: pointer;  
  }  
  @media (min-width: 768px) {  
    .NavButton {  
      font-size: 1.8rem;  
    }  
  }  
    .container{
    position:relative;
    top : 30px;
    background-color:white;
    border-top-left-radius: 30px;  
    border-top-right-radius: 30px;
    height:100vh;
    width:100vw;

    }
  .ContentContainer {  
    padding: 15px;  
    display: flex;  
    flex-direction: column;  
    gap: 10px;  
    overflow-y: auto;  
    flex: 1;  
    width: 100%;  
    box-sizing: border-box;  
  }  
  @media (min-width: 768px) {  
    .ContentContainer {  
      padding: 20px;  
    }  
  }  
  .ProfileCard {  
    background-color: #f9f9f9;  
    padding: 15px;  
    border-radius: 8px;  
    display: flex;  
    align-items: center;  
    gap: 15px;  
    flex-wrap: wrap;  
  }  
  @media (min-width: 768px) {  
    .ProfileCard {  
      padding: 20px;  
      border-radius: 12px;  
      gap: 20px;  
    }  
  }  
  .ProfilePic {  
    width: 60px;  
    height: 60px;  
    border-radius: 50%;  
    object-fit: cover;  
  }  
  @media (min-width: 768px) {  
    .ProfilePic {  
      width: 80px;  
      height: 80px;  
    }  
  }  
  .ProfileInfo {  
    flex-grow: 1;  
    display: flex;  
    flex-direction: column;  
    gap: 5px;  
  }  
  .ProfileRow {  
    display: flex;  
    gap: 10px;  
    font-size: 0.9rem;  
    flex-wrap: wrap;  
  }  
  @media (min-width: 768px) {  
    .ProfileRow {  
      font-size: 1rem;  
    }  
  }  
  .Label {  
    font-weight: bold;  
  }  
  .Value {  
    flex-grow: 1;  
  }  
  
  
  .TableContainer {  
    overflow-x: auto;  
  }  
  .ScoresTable {  
    width: 100%;  
    border-collapse: collapse;  
    margin-top: 10px;  
    border: 1px solid #ddd;  
    border-radius: 8px;  
  }  
  @media (min-width: 768px) {  
    .ScoresTable {  
      border-radius: 12px;  
    }  
  }  
  .TableHeaderCell {  
    border: 1px solid #ddd;  
    padding: 8px;  
    text-align: center;  
    font-size: 0.9rem;  
    background-color: #f0f0f0;  
    font-weight: bold;  
  }  
  @media (min-width: 768px) {  
    .TableHeaderCell {  
      padding: 10px;  
      font-size: 1rem;  
    }  
  }  
  .TableDataCell {  
    border: 1px solid #ddd;  
    padding: 8px;  
    text-align: center;  
    font-size: 0.9rem;  
  }  
  @media (min-width: 768px) {  
    .TableDataCell {  
      padding: 10px;  
      font-size: 1rem;  
    }  
  }  
`;  

export default Wrapper;