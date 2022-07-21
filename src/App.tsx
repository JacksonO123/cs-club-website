import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuthObj, getIsAdmin } from './firebase';
import { useState, useEffect } from 'react';
import { UserContext, UserLoadingContext, AdminContext } from './Contexts';

import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Router from './pages/Router/Router';

import './App.scss';

function App() {
  const auth = getAuthObj();
  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect((): void => {
    (async (): Promise<void> => {
      const tempIsAdmin = await getIsAdmin(user?.uid);
      setIsAdmin(tempIsAdmin);
    })();
  }, [user?.uid]);

  return (
    <UserContext.Provider value={user}>
      <UserLoadingContext.Provider value={loading}>
        <AdminContext.Provider value={isAdmin}>
          <div className="app col">
            <Header></Header>
            <div className="content row">
              <Sidebar />
              <Router />
            </div>
          </div>
        </AdminContext.Provider>
      </UserLoadingContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
