import styled from "styled-components";
const Wrapper = styled.div`
  margin:0;
  padding: 0;
  background-color:#fff;
  display: flex;
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
    .Header {
      font-size: 30px;
      font-weight: bold;
      display: flex;
      justify-content: center;
      align-item: center;
      padding: 30px 30px 30px 25px;
      color: white;
  }
  .back-icon{
  padding: 13px;
  }
  .name{
   padding: 4px;
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
    background-color: #F9F9F9;
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
    background-color: #F0F0F0;
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