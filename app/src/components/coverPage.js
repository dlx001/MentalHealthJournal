import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./login";
const CoverPage = ()=>{
    const { isAuthenticated} = useAuth0();
    return (
        !isAuthenticated && <LoginButton></LoginButton>
    )
}

export default CoverPage;