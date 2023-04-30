import { faAlignJustify } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header"
import LoginButton from "./login"
import Header2 from "./header2";
import BigLoginButton from "./BigLoginbutton";
const LoginPage = ()=>{
    return(<div>
        <Header2></Header2>
        <div>
            <div style={{display:"flex", justifyContent:"center",flexDirection:"column",alignItems:"center", 
            marginBottom: "200px",backgroundColor:"#FFD1DC",paddingBottom:"100px",  borderRadius: "0 0 50% 50%"}}>
                <img src='./HappyMindLogo.png' style={{width:"500px"}}></img>
                <h1 className="heading">HappyMind</h1>
                <BigLoginButton style={{width:"300px"}} text="Try Now!" ></BigLoginButton>
            </div>
            
            <div className="card" style={{display:"flex",marginBottom:"100px"}}>
            <div style={{width:"350px",marginLeft:"400px",marginRight:"50px"}}>
            <h1> Simple and Elegant</h1>
            <p>With simple input HappyMind allows for an objective visual track of mood and mental health progress </p>
            </div>
            <img src="./example.png" width="800px"></img>
            </div>
            <div className="card" style={{display:"flex",marginBottom:"100px",backgroundColor:"#FFD1DC",padding:"50px"}}>
                <img src="./NotesExample.png" width="400px" style={{paddingLeft:"400px"}} ></img>
                <div style={{width:"350px", marginLeft:"50px",}}>
                <h1>Note Storage</h1>
                <p>HappyMind allows users to log notes to track your mood along the day as well as corresponding events </p>
                </div>
            </div>
            <div style={{display:"flex",flexDirection:"column", justifyContent:"center", alignItems:"center",marginBottom:"100px"}}>
            <h1>Try The Demo</h1>
            <p>User:"developertest@gmail.com"  </p>
            <p> password:Developertest123"</p>
               
            <LoginButton text="Demo"></LoginButton>
            </div>
           
        </div>
         
    </div>
   )
    
}
export default LoginPage;