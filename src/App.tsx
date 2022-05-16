import './App.scss';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Router from './pages/Router/Router';
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  getAuthObj,
  getIsAdmin
} from './firebase';
import { useState, useEffect } from 'react';

function App() {

  const auth = getAuthObj();
  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);


  useEffect((): void => {
    async function checkIfAdmin(): Promise<void> {
      const tempIsAdmin = await getIsAdmin(user?.uid);
      setIsAdmin(tempIsAdmin);
    }
    checkIfAdmin();
  }, [user?.uid]);

  return (
    <div className="app col">
      <Header></Header>
      <div className="content row">
        <Sidebar user={user} userLoading={loading} isAdmin={isAdmin}></Sidebar>
        <Router user={user} isAdmin={isAdmin}></Router>
      </div>
    </div>
  );
}

export default App;