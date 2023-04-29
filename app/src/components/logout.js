import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <button className="logout" style={{marginRight:"12%",height:"20px" }}onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      <h4>Log Out</h4>
    </button>
  );
};

export default LogoutButton;