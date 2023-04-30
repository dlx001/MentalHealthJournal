import LogoutButton from "./logout"
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./login";
const Header2 = ({dropDownVis,setDropDownVis})=>{
    return(
        <div style={{display:"flex", paddingBottom:"5px",alignItems:"center",justifyContent:"space-between", borderBottom:"1px solid #DADADA",background: "#FAFAFA"}}>
            <div style={{display:"flex", paddingLeft:"15%"}}>
            <img src="/HappyMindLogo.png" style={{width:"100px"}}></img>
            <h1 style={{fontFamily:"Lemon",opacity:"0.5",paddingTop:"10px"}}>HappyMind</h1>
            </div>
            <div style={{marginRight:"15%"}}>
            <LoginButton text="Login" ></LoginButton>
            <LoginButton text="Try it for free"></LoginButton>
            </div>
           
        </div>
    )
}

export default Header2;