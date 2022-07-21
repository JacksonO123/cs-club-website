import { Routes, Route } from 'react-router-dom';
import { RouteType } from '../../interfaces';
import { v4 } from 'uuid';

import '../../utils.scss';
import './Router.scss';

import routes from './Routes';

interface Props {
  user: any;
  isAdmin: boolean;
}

export default function Router() {
  return (
    <div className="full router-wrapper">
      <Routes>
        {routes.map((route: RouteType) => (
          <Route
            path={route.path}
            element={route.element}
            key={v4()}
          />
        ))}
      </Routes>
    </div>
  );
}
