import LogoutButton from "./logout"
import { useAuth0 } from "@auth0/auth0-react";

const Header = ({dropDownVis,setDropDownVis})=>{
    const { user, isAuthenticated, isLoading } = useAuth0();
    return(
        <div style={{display:"flex", paddingBottom:"5px",alignItems:"center",justifyContent:"space-between", borderBottom:"1px solid #DADADA",background: "#FAFAFA"}}>
            <div style={{display:"flex", paddingLeft:"15%"}}>
            <img src="/Logo1.png" style={{width:"100px"}}></img>
            <h1 style={{fontFamily:"garamond",paddingTop:"10px"}}>MentalHealthTracker</h1>
            </div>
            <img src= {user.picture} alt="user.name" style={{borderRadius:"50%", width:"50px", height:"50px", marginRight:"425px",cursor:"pointer"}} onClick={()=>setDropDownVis(!dropDownVis)}></img>
        </div>
    )
}

export default Header;