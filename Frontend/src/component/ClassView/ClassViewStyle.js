const styles = `
  .class-container {
    width: 100%;
    height: 94vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f8f9fa;
  }

  .class-header {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 25px;
    background-color: #20b2aa;
    color: white;
  }

  .header-icons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .back-icon {
    padding-left: 20px;
  }

  .right-icons {
    display: flex;
    gap: 10px;
    padding-right: 20px;
  }

  .class-overview {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .class-title {
    font-size: 24px;
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
    border-color :  #75D2EA;
  }

  .chart-wrapper {
    width: 90%;
    overflow-x: auto;
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
`;

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default styles;