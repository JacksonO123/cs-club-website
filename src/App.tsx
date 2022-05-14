import './App.scss';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Router from './pages/Router/Router';
import { useAuthState } from 'react-firebase-hooks/auth'
import { getAuthObj } from './firebase';

function App() {

  const auth = getAuthObj();
  const [user, loading, error] = useAuthState(auth);

  return (
    <div className="app col">
      <Header></Header>
      <div className="content row">
        <Sidebar user={user} userLoading={loading}></Sidebar>
        <Router></Router>
      </div>
    </div>
  );
}

export default App;