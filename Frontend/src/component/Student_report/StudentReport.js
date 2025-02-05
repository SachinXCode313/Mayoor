import styled from "styled-components";
const Wrapper = styled.div`
  width: 100%;
  height: 90%;
  box-sizing : border-box;
  overscroll-behavior-y: none;
  .header {
    background-color: #21C3BC;
    color: white;
    height: 50px;
    text-align: center;
    padding: 15px;
    font-size: 16px;
    font-weight: bold;
    top: 0;
    width: 100%;
    // z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .back-icon {
    position: absolute;
    left: 15px;
    cursor: pointer;
    font-size: 18px;
  }
  .main-container {
    background-color: white;
  }
  .student-info {
    height: 150px;
    display: flex;
    align-items: center;
    background-color: #fff;
    gap: 20px;
  }
  .profile-pic img {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin-left: 20px;
  }
  .student-details p,
  .student-section p {
    font-size: 14px;
    margin: 3px 0;
  }
  .percentage-container {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;
  }
  .percentage {
    text-align: center;
    width: 90px;
  }
  .percentage p {
    font-size: 11px;
    margin-top: 5px;
  }
  .chart-container {
    width: 340px;
    height: 300px;
    background-color: #fff;
    border-radius: 10px;
    margin-left: 20px;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
  }
  .remark-section {
    position: relative;
    margin-top: 40px;
  }
  .remark-section textarea {
    width: 100%;
    height: 50px;
    border-radius: 5px;
    padding: 8px;
    font-size: 13px;
  }
  .edit-icon {
    position: absolute;
    right: 8px;
    top: 8px;
    cursor: pointer;
    color: gray;
  }
  .score-component {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 1;
  }
  .average-title{
  margin-left: 20px;
  }
  .subject-title{
  margin-top: 40px;
  margin-left: 20px;
  }
`
export default Wrapper

