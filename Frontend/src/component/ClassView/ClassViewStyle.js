const styles = `
  .class-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f8f9fa;
    height: 35px;
  }

  .class-header {
    width: 100%;
    height: 70px;
    display: flex;
    flex-direction: row;
    gap: 60px;
    align-items: center;
    padding-top: 25px;
    background-color:#21c2ba;
    color: white;
    // gap: 50px
  }

  .class-title{
  text-align: center;
  }

  .info-box {
    width: 80%;
    display: flex;
    justify-content: space-between;
    padding: 15px;
    border-radius: 10px;
    margin-top: 10px;
    border: 1px solid #3b82f6;
    color: black;
    font-size: 14px;
    line-height: 1.5;
    text-align: right;
  }
  /* Percentage Circles */
 .percentage-container {
  border-radius: 15px;
  display: flex;
  justify-content: space-around;
  margin: 15px 0;
  flex-wrap: wrap; /* Allow wrapping for responsiveness */
}

.percentage {
  text-align: center;
  width: 90px; /* Adjust width as needed */
  flex: 1 1 100px; /* Allow flexibility in size */
  max-width: 120px; /* Set a maximum width */
}

.percentage p {
  font-size: 11px;
  margin-top: 5px;
}
  .info-text {
    width: 100%;
    text-align: left;
  }

  .chart-dropdown {
    background-color: #75D2EA;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
  }

  .chart-wrapper {
    width: 90%;
    overflow-x: auto;
    margin-top: 50px;
  }

  .chart-container {
    width: 150%;
    height: 250px;
    margin-top: 10px;
  }

  .header-image {
    width: 24px;
    height: 24px;
  }
  .header-image-menu {
    width: 34px;
    height: 34px;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default styles