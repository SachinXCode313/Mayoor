import styled from "styled-components";
const Wrapper = styled.section`
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #21C2BA;
    font-family: Poppins;
    #profile-image {
        width : 70%;
        border-radius : 70px;
    }
    #user {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 40px 70px;
        font-size: 17px;
        color: black;
        /* font-family: Poppins; */
    }
    #user-content {
        display: flex;
        flex-direction: column;
    }
    #image {
        display: flex;
        gap: 15px;
        align-items: center;
        margin-left: auto;
    }
    #profile{
        height: 40px;
        width: 40px;
    }
    #notification{
        height: 40px;
        width: 40px;
    }
    #name {
        font-size: 35px;
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
        gap: 20px;
        align-items: center;
        padding: 50px 20px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        flex : 1;
    }
    select {
        width: 80%;
        padding: 15px;
        font-weight: 600;
        border-radius: 50px;
        background-color: rgba(179, 228, 244, 0.78);
        border: none;
        outline: none;
        transition: 0.3s;
        cursor: pointer;
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
        padding-left: 11%;
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