import styled from "styled-components";

const Wrapper = styled.section`
    font-family:sans-serif;
    width: 100%;
    height: 90vh; /* Fix the height to the viewport size */
    display: flex;
    flex-direction: column;
    overflow: hidden; /* Prevent overflowing of the container */
    background-color: #21c3bc;

  
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
  
.list-icon{
  height: 20px;
 // background-color: #21c3bc;
}
.list-icon-container{
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
