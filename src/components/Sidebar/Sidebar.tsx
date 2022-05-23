import './Sidebar.scss';
import CustomLink from '../CustomLink/CustomLink';
import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import PersonIcon from '@mui/icons-material/Person';
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded';
import ConstructionIcon from '@mui/icons-material/Construction';
import { signIn, signOut } from '../../firebase';
import { useLocation } from 'react-router-dom';

interface Props {
  user?: any;
  userLoading?: boolean;
  isAdmin: boolean;
}

export default function Sidebar({ user, userLoading, isAdmin }: Props) {
  const location = useLocation();
  const p = location.pathname.match(/^(\/\w+)/)?.[1];
  console.log(p);
  const [pathname, setPathname] = useState<string | undefined>(p);
  const [expanded, setExpanded] = useState<boolean>(true);
  let paths = [
    {
      path: '/',
      name: 'Home',
      icon: <HomeRoundedIcon />,
    },
    {
      path: '/announcements',
      name: 'Announcements',
      icon: <NotificationsNoneRoundedIcon />,
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      icon: <LeaderboardRoundedIcon />,
    },
    {
      path: '/challenges',
      name: 'Challenges',
      icon: <ConstructionIcon />,
    },
    {
      path: '/problems',
      name: 'Problems',
      icon: <PriorityHighRoundedIcon />,
    },
  ];
  if (isAdmin) {
    paths.push(
      ...[
        {
          path: '/admin',
          name: 'Admin Panel',
          icon: <AdminPanelSettingsRoundedIcon />,
        },
        {
          path: '/attendance',
          name: 'Attendance',
          icon: <PersonIcon />,
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
  };

  const handleSetPath = (path: string): void => {
    setPathname(path);
  };

  return (
    <div className={`sidebar ${expanded ? 'expanded' : 'contracted'}`}>
      <div className="sections">
        {paths.map((path: any, index: number) => {
          return (
            <CustomLink to={path.path} key={`${index}-sidebar-link`}>
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
            </CustomLink>
          );
        })}
      </div>
      <div className={`expand-arrow-wrapper ${expanded ? 'row' : 'col'}`}>
        {user === null && !userLoading ? (
          <button
            className={`sign-in-button ${!expanded ? 'expanded' : ''}`}
            onClick={handleSignIn}
          >
            <PersonRoundedIcon />
            {expanded ? <span>Sign in</span> : <></>}
          </button>
        ) : (
          <button
            className={`sign-out-button ${!expanded ? 'expanded' : ''}`}
            onClick={handleSignOut}
          >
            <LogoutRoundedIcon />
            {expanded ? (
              <>
                <span>Sign out</span>
              </>
            ) : (
              <></>
            )}
          </button>
        )}
        <button
          className={`expand-arrow ${!expanded ? 'expanded' : ''}`}
          onClick={handleToggleExpand}
        >
          <ChevronLeftIcon />
        </button>
      </div>
    </div>
  );
}
