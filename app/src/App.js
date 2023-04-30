import Profile from './components/profile';
import LoginPage from './components/LoginPage';
import { useAuth0 } from "@auth0/auth0-react";
function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <div>
      {!isLoading&&!isAuthenticated&&<LoginPage></LoginPage>}
      {isAuthenticated&&<Profile></Profile>}
    </div>
  );
}

export default App;
