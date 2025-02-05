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
    background-color: #21c2ba;
    color: white;
  }

  .closebtn {
    background-color: #ddd;
    color: black;
  }
`;

export default Wrapper;