
import './App.css';
import LoginButton from './components/login';
import LogoutButton from './components/logout';
import Profile from './components/profile';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginButton></LoginButton>
        <LogoutButton></LogoutButton>
        <Profile></Profile>
      </header>
    </div>
  );
}

export default App;
