import Wrapper from "./style"
import React from "react";
const Profile = ({user = {photoURL : "url", displayName: "name"}}) => {
  console.log(user)
    return (
      <Wrapper>
         <div className="profile">
                <table>
                  <tr>
                    <td> <img src={user.photoURL} alt={user.displayName} width="100" />
                    </td>
                    <td>
                    <h2>Hi, {user.displayName} !</h2>
                    </td>
                  </tr>
                </table>
          </div>
      </Wrapper>
    );
  }
  export default Profile;