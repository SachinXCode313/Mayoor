import styled from "styled-components";
const Wrapper = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #21C2BA;
    font-family: Poppins;
    // padding: 20px;
    #user {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 40px 20px 50px 30px;
        font-size: 17px;
        color: black;
    }

    #user-content {
        display: flex;
        flex-direction: column;
    }

    #hi{
    font-size:19px;
    font-weight:bold;
    }
    
    #image {
        display: flex;
        gap: 15px;
        align-items: center;
        margin-left: auto;
    }
    #profile{
        height: 30px;
        width: 30px;
        margin-top: -70px;
    }
    #notification{
        height: 30px;
        width: 30px;
        margin-top: -70px;
    }
    #menu{
    height: 47px;
    width: 40px;
    margin-top: -70px;
    }

    #name {
        font-size: 33px;
        font-weight: bold;
    }
    p {
        font-size: 15px;
        margin-top: 5px;
    }
    form {
        background-color: #FFFFF0;
        border-radius: 30px 30px 0 0;
        display: flex;
        flex-direction: column;
        gap: 15px;
        align-items: center;
        padding: 50px 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        flex : 1;
    }
    select {
        appearance: none; /* Removes default browser styles */
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 90%;
        padding: 10px;
        font-weight: 600;
        border-radius: 50px;
        background-color: #9CD8E7;
        border: none;
        outline: none;
        transition: 0.3s;
        cursor: pointer;
        background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"><path d="M6 9L12 15L18 9" stroke="%23000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>');
        background-repeat: no-repeat;
        background-position: right 12px center;
        background-size: 14px;
    }
    select:hover {
        background-color: rgba(179, 228, 244, 0.9);
    }
    select:disabled {
        cursor: not-allowed;
        opacity: 0.6;
    }
    label {
        align-self: flex-start;
        padding-left: 6%;
        font-weight: bold;
        font-size: 14px;
    }
    #submit {
        width: 25%;
        padding: 15px;
        border-radius: 50px;
        background-color: #409FF3;
        color: white;
        font-weight: bold;
        cursor: pointer;
        border: none;
        transition: 0.3s;
    }
    #submit:hover {
        background-color: #3078C0;
    }
    #submit:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;
export default Wrapper;