import styled from "styled-components";

const Wrapper = styled.section`
    height : 100vh;    
    display: flex;
    flex-direction: column;
    .screen{
        flex : 1;
        display: flex;
        flex-direction: column;
    }
    .bottom{
        height: 60px;
        display: flex;
        input{
            flex : 1;
            border : none;
            background : #135d5d;
            color : #fff;
            padding : 15px;
            font-weight: bold;
            cursor: pointer;
            &.active{
                background-color: #21c3bc;
            }
        }
        .tab-icon{
            flex : 1;
            border : none;
            background : #135d5d;
            color : #fff;
            font-weight: bold;
            cursor: pointer;
            &.active{
                background-color: #21c3bc;
            }
        }
    }
`

export default Wrapper