import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();

  return <button className="button-13" style={{marginRight:"20px"}}onClick={() => loginWithRedirect()}>{props.text}</button>;
};

export default LoginButton;