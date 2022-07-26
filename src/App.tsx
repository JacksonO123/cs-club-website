import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuthObj, getIsAdmin } from './firebase';
import { useState, useEffect } from 'react';
import { UserContext, UserLoadingContext, AdminContext } from './Contexts';
import { styled } from '@mui/material/styles';
import { utils } from 'src/style-utils';

import Header from './components/header';
import Sidebar from './components/sidebar';
import Router from './pages/router';

const AppWrapper = styled('div')({
  maxHeight: '100vh',
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column'
});

const Content = styled('div')({
  height: '100%',
  width: '100vw',
  maxHeight: `calc(100vh - ${utils.headerHeight})`,
  display: 'flex',
});

const App = () => {
  const auth = getAuthObj();
  const [user, loading, error] = useAuthState(auth);
  // admin; null = loading, false = not admin
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

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
          <AppWrapper>
            <Header></Header>
            <Content>
              <Sidebar />
              <Router />
            </Content>
          </AppWrapper>
        </AdminContext.Provider>
      </UserLoadingContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
