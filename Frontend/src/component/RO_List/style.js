import styled from "styled-components";

const Wrapper = styled.section`
    font-family:sans-serif;
    width: 100%;
    height: 94vh; /* Fix the height to the viewport size */
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Prevent overflowing of the container */
    background-color: #21c3bc;

    .search-container {
      display: flex;
      gap: 60px;
      align-items: center;
      position: relative;
      width: 100%;
      margin: 15px 0;
      padding-left: 12px;
      padding-right:12px;
    }
    .menu{
    padding-right:17px;
    }
    .icon{
      display: flex;
      gap: 12px;
      align-items: center;
      padding-right: 15px;
    }
       .search-bar {
      width: 100%;
      padding: 10px 40px 10px 15px; /* Padding for space for the search icon */
      font-size: 16px;
      border-radius: 25px;
      border: 1px solid #ddd; /* Same border color as other elements */
      background-color: #A6E0DD; /* White background for consistency */
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Light shadow for subtle depth */
      outline: none;
      transition: border-color 0.3s, box-shadow 0.3s; /* Smooth transition */
      margin: 10px;
    }
    .search-bar:focus {
      border-color: #00796B; /* Matching the color scheme */
      box-shadow: 0 2px 4px rgba(0, 121, 107, 0.2);
      background-color: white;/* Focus shadow effect */
    }
    .search-bar::placeholder {
      color: #aaa
       }
      
    .no-results{
    list-style: none;
    flex: 1; /* Allow the list to grow and take up available space */
    overflow-y: auto; /* Enable vertical scrolling */
    scrollbar-width: thin; /* For Firefox: thinner scrollbar */
    scrollbar-color: #ccc transparent;
    border-top-left-radius:30px;
    border-top-right-radius: 30px;
    background-color: #fff;
    padding: 10px;
  }

  .no_results{
    color: gray;
    text-align: center;
  }
    .list-icon-container {
      position: absolute;
      left: 10px; /* Position the search icon inside the input */
      top: 50%;
      transform: translateY(-50%);
    }

    .list-icon {
      width: 18px;
      height: 18px;
      opacity: 0.7;
    }

    
    .ro-list-title {
    text-align: center;
    color: white;
    margin-bottom: 10px;
    padding: 15px;
    height: 50px;
  }

  .ro-list {
    list-style: none;
    flex: 1; /* Allow the list to grow and take up available space */
    overflow-y: auto; /* Enable vertical scrolling */
    scrollbar-width: thin; /* For Firefox: thinner scrollbar */
    scrollbar-color: #ccc transparent;
    border-top-left-radius:30px;
    border-top-right-radius: 30px;
    background-color: #fff;
    padding: 10px;
  }

  .ro-list::-webkit-scrollbar {
    width: 8px; /* Width of the scrollbar for WebKit browsers */
  }

  .ro-list::-webkit-scrollbar-thumb {
    background-color: #ccc; /* Color of the scrollbar thumb */
    border-radius: 4px;
  }

  .ro-list-item {
    background: white;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 10px;
    overflow: hidden;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 10px;
  }

  .ro-header {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .ro-info {
    flex: 1;
  }

  .ro-dropdown-icon {
    font-size: 18px;
    color: #00796b;
  }

  .ro-dropdown-content {
    padding: 10px;
    background: #e0f2f1;
    color: #004d40;
  }
  
.list-icons{
  height: 20px;
 // background-color: #21c3bc;
}
.list-icon-containers{
 // background-color: #21c3bc;
  margin-right: 10px;
  border-radius: 5px;
  padding: 2px;
}
/* .item-title{
  font-weight: bold;
} */
`

export default Wrapper;