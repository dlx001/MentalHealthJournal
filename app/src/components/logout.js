import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className="logout" style={{marginRight:"12%",height:"20px",alignContent:"center",display:"flex",alignItems:"center" }}onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <FontAwesomeIcon icon={faRightFromBracket} style={{marginRight:"20px"}}/> <h4>Log Out</h4>
    </button>
  );
};

export default LogoutButton;