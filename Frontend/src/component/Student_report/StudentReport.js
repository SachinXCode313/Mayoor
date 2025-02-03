import styled from "styled-components";

const Wrapper = styled.div`
  /* Global Styles */
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f8f8f8;

  /* Header */
  .header {
    background-color: #21C3BC;
    color: white;
    text-align: center;
    padding: 15px;
    font-size: 16px;
    font-weight: bold;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1000;
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

  /* Main Container */
  .main-container {
    margin-top: 70px;
    padding: 20px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    min-height: calc(90vh - 80px);
    position: relative;
  }

  /* Student Info Section */
  .student-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
  }

  .profile-pic img {
    width: 45px;
    height: 45px;
    border-radius: 50%;
  }

  /* Student Details */
  .student-details p,
  .student-section p {
    font-size: 12px;
    margin: 3px 0;
  }

  /* Percentage Circles */
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

  /* Chart Container */
  .chart-container {
    width: 100%;
    height: 300px;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px;
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.1);
    margin: 15px 0;
  }

  /* Remark Section */
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

  /* Score Components */
  .score-component {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 1;
  }
`;

export default Wrapper;