import { Routes, Route } from 'react-router-dom';
import { RouteType } from 'src/interfaces';
import { v4 } from 'uuid';
import { styled } from '@mui/material/styles';

import routes from './PageRoutes';

const RouterWrapper = styled('div')({
  height: '100%',
  width: '100%',
  background: 'rgba(0, 0, 0, 0.03)',
  overflow: 'scroll'
});

const Router = () => {
  return (
    <RouterWrapper>
      <Routes>
        {routes.map((route: RouteType) => (
          <Route
            path={route.path}
            element={route.element}
            key={v4()}
          />
        ))}
      </Routes>
    </RouterWrapper>
  );
};

export default Router;
