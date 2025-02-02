import styled from "styled-components";

const Wrapper = styled.div`
body {
    font-family: 'Poppins', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #21C3BC;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    overflow: hidden;
  }
  
  .container {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .btn{
      background-color: #21C3BC;;
      border: 0;
      font-size: 30px
  }
  
  .header {
    width: 90%;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: black;
    font-size: 40px;
      height: 10%
  }
  
  h1 {
    font-size: 50px;
    text-align: center;
    flex: 1;
    margin-top: 150px
  }
  
  .profile-section {
    background-color: white;
    position: absolute;
    top: 200px;
    width: 100%;
    height: 80%; 
    border-top-left-radius: 50px;
    border-top-right-radius: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .avatar-container {
    display: flex;
    align-items: center;
      margin:50px; 
  }
  
  #teacher-img {
    border-radius: 50%;
  }
  
  .user-details {
    font-size: 4vw;
  }
  
  .form-container {
        width: 90%;
        display: flex;
        flex-direction: column;
        gap: 3vw;
  }
  
  .form-criteria {
    font-size: 20px;
    margin-bottom: px;
  }
  
  .form-input {
      height: 30px;
      border-radius: 15px;
      background-color: #89D1DC4F;
      font-size: 20px
  }
  
  #save-button {
      height: 50px;
      width: 50%;
      font-size: 25px;
      margin-top: 60px;
      background-color: #409FF3;
      border-radius: 50px;
      margin-left: 50%;
      color: white;
      border: 0;
  }
  
  @media (max-width: 480px) {
    .profile-section {
      height: 80vh;
    }
  
    #teacher-img {
      width: 25vw;
      height: 25vw;
    }
  
    #save-button {
      height: 40px;
    }
  }
  `
  export default Wrapper