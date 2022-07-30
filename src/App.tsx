import { useAuthState } from 'react-firebase-hooks/auth';
import { getAuthObj, getIsAdmin } from './firebase';
import { useState, useEffect } from 'react';
import {
  UserContext,
  UserLoadingContext,
  AdminContext,
  UserResponseContext,
} from './Contexts';
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
  const [userResponse, setUserResponse] = useState<boolean>(false);

  useEffect((): void => {
    if (user?.uid !== undefined) {
      (async (): Promise<void> => {
        const tempIsAdmin = await getIsAdmin(user?.uid);
        setIsAdmin(tempIsAdmin);
      })();
    }
  }, [user?.uid]);

  useEffect(() => {
    if (loading === false) {
      setUserResponse(true);
    }
  }, [loading]);

  return (
    <UserContext.Provider value={user}>
      <UserResponseContext.Provider value={userResponse}>
        <UserLoadingContext.Provider value={loading}>
          <AdminContext.Provider value={isAdmin}>
            <AppWrapper>
              <Header />
              <Content>
                <Sidebar />
                <Router />
              </Content>
            </AppWrapper>
          </AdminContext.Provider>
        </UserLoadingContext.Provider>
      </UserResponseContext.Provider>
    </UserContext.Provider>
  );
};

export default App;
