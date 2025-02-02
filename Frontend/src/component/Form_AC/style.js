import styled from "styled-components";

const Wrapper = styled.section`
  p {
    font-size: 16px;
    font-weight: bold;
  }

  .input {
    width: 90%;
    padding: 10px;
    margin: 10px 0
    ;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
  }

  .buttons {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .savebtn, .closebtn {
    width: 48%;
    height: 35px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    font-size: 14px;
  }

  .savebtn {
    background-color: #4CAF50;
    color: white;
  }

  .savebtn:hover {
    background-color: #45a049;
  }

  .closebtn {
    background-color: #f44336;
    color: white;
  }

  .closebtn:hover {
    background-color: #da190b;
  }
`;

export default Wrapper;