import LogoutButton from "./logout"
import { useAuth0 } from "@auth0/auth0-react"
const DropDown=()=>{
    const { user, isAuthenticated, isLoading } = useAuth0();
    return(<div style={{position:"absolute",left:"52%",zIndex:"2", padding:"20px",background: "#FAFAFA", boxShadow:"-2px 2px 4px rgba(0, 0, 0, 0.3)"}}>
        <div className="dropDown" style={{borderBottom:"1px solid #DADADA"}}>
        <img style={{borderRadius:"50%", height:"50px", width:"50px", marginRight:"10px"}}src={user.picture}></img>
        <h4>{user.name}</h4>
        </div>
        <LogoutButton></LogoutButton>
    </div>)
    
}

export default DropDown