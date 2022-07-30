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
  Info,
} from '@mui/icons-material';
import { Button } from '@mui/material';
import { utils } from 'src/style-utils';

import type { PathType } from 'src/interfaces';

import Link from '../link';
import styled from 'styled-components';
import ExpandDown from '../keyframes/expand-down';

const borderColor: string = 'rgba(0 0 0 / 20%)';
const expandedWidth: string = '250px';
const contractedWidth: string = '60px';
const margin: string = '8px';
const borderRadius: string = '4px';

interface SidebarWrapperProps {
  expanded: boolean;
}

const SidebarWrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	width: 100%;
	border-right: 1px solid ${borderColor};
	padding: ${margin};
	padding-top: 12px;
	transition: 0.25s ease-in-out;
	overflow: hidden;
  ${(props: SidebarWrapperProps): string => (
    props.expanded
      ? `
        max-width: ${expandedWidth};
        min-width: ${expandedWidth};
        .sections {
          .section {
            gap: 10px;
          }
        }
      `
      : `
      max-width: ${contractedWidth};
      min-width: ${contractedWidth};
      .sections {
        .section {
          padding: 0;
          width: 100%;
          svg {
            width: 100%;
            aspect-ratio: 1;
          }
        }
      }
    `
  )}
`;

const Sections = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${margin};
  transition: 0.15s;
`;

interface SectionProps {
  active: boolean;
}

const Section = styled.div`
  transition: 0.15s;
  width: 100%;
  height: 39px;
  padding: 0 30px;
  transition: 0.15s;
  cursor: pointer;
  border-top: none;
  border-radius: 4px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  white-space: nowrap;
  transition: 0.15s;
  gap: 10px;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    transition: background 0.15s, transform 0.3s ease-in-out;
    transform: scaleX(0);
    background: rgba(${utils.yellowRgb}, 0.25);
    transform-origin: left;
    border-radius: ${borderRadius};
  }
  &:hover::before {
    transform: scaleX(1);
  }
  ${(props: SectionProps): string => (

    props.active
      // fix utils.yellow to make it an actual color
      ? `
        background: rgba(${utils.yellowRgb}, 0.5) !important;
        &::before {
          background: transparent !important;
        }
      ` : ''
  )}
`;

interface ExpandedArrowWrapperProps {
  direction: string;
}

const ExpandedArrowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${(props: ExpandedArrowWrapperProps): string => props.direction};
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding: 10px;
  .expand-arrow {
    height: 40px;
    aspect-ratio: 1;
    border: none;
    border-radius: 100px;
    transition: background 0.15s, transform 0.25s ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.125);
    }
    &.expanded {
      transform: rotate(180deg);
    }
  }
`;

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
  paths.push({
    path: '/about',
    name: 'About',
    icon: <Info />
  });

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
    <SidebarWrapper expanded={expanded}>
      <ExpandDown>
        <Sections>
          {paths.map((path: PathType, index: number) => {
            return (
              <Link to={path.path} key={`path-link-${index}`}>
                <Section
                  active={path.path === pathname}
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
                </Section>
              </Link>
            );
          })}
        </Sections>
      </ExpandDown>
      <ExpandedArrowWrapper direction={expanded ? 'row' : 'column'}>
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
            {expanded && <span>Sign in</span>}
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
      </ExpandedArrowWrapper>
    </SidebarWrapper>
  );
};

export default Sidebar;
