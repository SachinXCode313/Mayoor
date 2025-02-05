import styled from "styled-components";

const Wrapper = styled.section`
  

  p {
    margin-bottom: 15px;
    font-size: 16px;
    font-weight: bold;
    color: #333;
  }

  .input {
    color: black;
    height: 30px;
    width: 100%;
    padding: 5px;
    margin-bottom: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .submitbtn, .closebtn {
    width: 48%;
    height: 35px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 14px;
  }

  .submitbtn {
    background-color: #21c2ba;
    color: white;
  }

  .closebtn {
    background-color: #ddd;
    color: black;
    
  }

`;

export default Wrapper;