import LogoutButton from "./logout"


const Header = ()=>{
    return(
        <div style={{display:"flex"}}>
            <img src="/Logo1.png" style={{width:"100px"}}></img>
            <h1>MentalHealthTracker</h1>
            <LogoutButton></LogoutButton>
        </div>
    )
}

export default Header;