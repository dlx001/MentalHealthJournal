import Profile from './components/profile';
import LoginButton from './components/login';
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div>
      {!isAuthenticated&&<LoginButton></LoginButton>}
      {isAuthenticated&&<Profile></Profile>}
    </div>
  );
}

export default App;
