import { signIn, signOut } from 'src/firebase';
import { useLocation } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AdminContext, UserContext, UserLoadingContext } from 'src/Contexts';
import {
  ChevronLeft,
  HomeRounded,
  NotificationsNoneRounded,
  LeaderboardRounded,
  PersonRounded,
  LogoutRounded,
  AdminPanelSettingsRounded,
  Person,
  PriorityHighRounded,
  Construction,
} from '@mui/icons-material';
import { Button } from '@mui/material';

import type { PathType } from 'src/interfaces';

import Link from '../link';

// convert scss to styled components
import './styles/Sidebar.scss';

const Sidebar = () => {

  const user: any = useContext(UserContext);
  const isAdmin: boolean | null = useContext(AdminContext)
  const loading: boolean = useContext(UserLoadingContext);

  const location = useLocation();
  let p = location.pathname.match(/^(\/\w+)/)?.[1] || '/';
  const [pathname, setPathname] = useState<string | undefined>(p);
  const [expanded, setExpanded] = useState<boolean>(true);
  let paths: PathType[] = [
    {
      path: '/',
      name: 'Home',
      icon: <HomeRounded />,
    },
    {
      path: '/announcements',
      name: 'Announcements',
      icon: <NotificationsNoneRounded />,
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      icon: <LeaderboardRounded />,
    },
    {
      path: '/problems',
      name: 'Problems',
      icon: <PriorityHighRounded />,
    },
  ];
  if (user != null) {
    paths.push({
      path: '/challenges',
      name: 'Challenges',
      icon: <Construction />,
    });
  }
  if (isAdmin) {
    paths.push(
      ...[
        {
          path: '/admin',
          name: 'Admin Panel',
          icon: <AdminPanelSettingsRounded />,
        },
        {
          path: '/attendance',
          name: 'Attendance',
          icon: <Person />,
        },
      ]
    );
  }

  const handleToggleExpand = (): void => {
    setExpanded((prev) => !prev);
  };

  const handleSignIn = () => {
    signIn();
  };

  const handleSignOut = () => {
    signOut();
    window.location.reload();
  };

  const handleSetPath = (path: string): void => {
    setPathname(path);
  };

  const buttonSx = {
    minWidth: 0,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    overflow: 'hidden',
    span: {
      whiteSpace: 'nowrap'
    }
  }

  const buttonSxExpanded = {
    ...buttonSx,
    padding: '5px 8px 5px 5px !important'
  };

  const buttonSxContracted = {
    ...buttonSx,
    padding: '5px !important'
  }

  return (
    <div className={`sidebar ${expanded ? 'expanded' : 'contracted'}`}>
      <div className="sections">
        {paths.map((path: PathType, index: number) => {
          return (
            <Link to={path.path} key={`path-link-${index}`}>
              <div
                className={`${path.path === pathname ? 'active' : ''} section`}
                onClick={() => handleSetPath(path.path)}
              >
                {expanded ? (
                  <>
                    {path.icon}
                    <span>{path.name}</span>
                  </>
                ) : (
                  path.icon
                )}
              </div>
            </Link>
          );
        })}
      </div>
      <div className={`expand-arrow-wrapper ${expanded ? 'row' : 'col'}`}>
        {user === null && !loading ? (
          <Button
            className={`sign-in-button ${!expanded ? 'expanded' : ''}`}
            onClick={handleSignIn}
            variant="contained"
            sx={
              expanded ? buttonSxExpanded : buttonSxContracted
            }
          >
            <PersonRounded />
            {expanded ? <span>Sign in</span> : <></>}
          </Button>
        ) : (
          <Button
            className={`sign-out-button ${!expanded ? 'expanded' : ''}`}
            onClick={handleSignOut}
            color="error"
            variant="outlined"
            sx={
              expanded ? buttonSxExpanded : buttonSxContracted
            }
          >
            <LogoutRounded />
            {expanded && <span>Sign out</span>}
          </Button>
        )}
        <button
          className={`expand-arrow ${!expanded ? 'expanded' : ''}`}
          onClick={handleToggleExpand}
        >
          <ChevronLeft />
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
