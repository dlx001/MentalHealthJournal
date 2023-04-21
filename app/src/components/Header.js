import LogoutButton from "./logout"


const Header = ()=>{
    return(
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style={{display:"flex", paddingLeft:"15%"}}>
            <img src="/Logo1.png" style={{width:"100px"}}></img>
            <h1 style={{fontFamily:"garamond",paddingTop:"10px"}}>MentalHealthTracker</h1>
            </div>
            <LogoutButton></LogoutButton>
        </div>
    )
}

export default Header;