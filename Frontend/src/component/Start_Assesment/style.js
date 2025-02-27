import styled from "styled-components";
const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  overflow: hidden;
  .search-container {
    display: flex;
    gap: 60px;
    align-items: center;
    position: relative;
    background-color: #21C3BC;
    width: 100%;
    margin: 22px 0;
    padding-left: 19px;
  }
  .search-bar {
    width: 200px;
    padding: 10px 40px 10px 15px;
    font-size: 16px;
    border-radius: 25px;
    border: 1px solid #ddd;
    background-color: #A6E0DD;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    outline: none;
    transition: border-color 0.3s, box-shadow 0.3s;
    margin-left: -60px;
  }
  .search-bar:focus {
    border-color: #00796B;
    box-shadow: 0 2px 4px rgba(0, 121, 107, 0.2);
    background-color: white;
  }
  .search-bar::placeholder {
    color: #aaa;
  }
  .back-button {
    background-color: transparent;
    border: none;
    font-size: 20px;
    cursor: pointer;
    color: #000000;
    margin-right: 15px;
    margin-left: 3px;
  }
  .profile-section {
    text-align: center;
    width: 100%;
    height: 180px;
    background-color: #21C3BC;
    box-shadow: 0px 4px 6px rgba(244, 240, 240, 0.1);
    align-items: center;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    // justify-content: center;
  }
  .profile-image {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    border: 5px solid #FFFFFF;
  }
  .name {
    font-family: sans-serif;
    font-size: 25px;
    margin-top: 10px;
    color: black;
  }
  .max-marks {
    font-size: 14px;
    color: black;
    margin-top: 5px;
  }
  .roll-number {
    margin-top: 12px;
    font-size: 11px;
  }
  .ac-container {
    // position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    height: calc(100vh - 250px);
    max-width: 100%;
    border-top-left-radius: 40px;
    border-top-right-radius: 40px;
    background-color: white;
    margin-top: -30px;
  }
  .ac-container::-webkit-scrollbar {
    display: none;
  }
  .student-list {
    width: 100%;
    height: 200px;
    overflow-y: auto;
    scroll-behavior: smooth;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .scroll-up, .scroll-down {
    background-color: #21C3BC;
    color: white;
    border: none;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    font-size: 20px;
    cursor: pointer;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    transition: transform 0.2s, background-color 0.3s;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.2);
    margin: 10px;
  }
  .scroll-up {
    top: 2px;
  }
  .scroll-down {
    bottom: -10px;
  }
  .ac-box {
    width: 180px;
    height: 180px;
    background-color: #FFFFFF;
    border-radius: 15px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
    padding: 10px;
  }
  .marks-input {
    width: 80%;
    padding: 7px;
    font-size: 13px;
    text-align: center;
    border-radius: 10px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    margin-top: 20px;
  }
  .done-button {
    background-color: rgb(53, 114, 130);
    color: white;
    font-size: 17px;
    font-weight: bold;
    text-align: center;
    padding: 10px 20px;
    border: none;
    border-radius: 15px;
    cursor: pointer;
    margin: 20px auto;
    width: 150px;
  }`
export default Wrapper