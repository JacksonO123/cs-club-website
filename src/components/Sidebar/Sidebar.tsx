import './Sidebar.scss';
import CustomLink from '../CustomLink/CustomLink';
import { useEffect, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import PersonIcon from '@mui/icons-material/Person';
import {
	getUser,
	signIn,
	signOut,
} from '../../firebase';
import { useLocation } from 'react-router-dom';

interface Props {
	user?: any;
	userLoading?: boolean;
	isAdmin: boolean;
}

export default function Sidebar({ user, userLoading, isAdmin }: Props) {

	const location = useLocation();
	//const user 
	const [pathname, setPathname] = useState<string>(location.pathname);
	const [expanded, setExpanded] = useState<boolean>(true);
	let paths = [
		{
			path: '/',
			name: 'Home',
			icon: <HomeRoundedIcon />
		},
		{
			path: '/announcements',
			name: 'Announcements',
			icon: <NotificationsNoneRoundedIcon />
		},
		{
			path: '/leaderboard',
			name: 'Leaderboard',
			icon: <LeaderboardRoundedIcon />
		},
		{
			path: '/programs',
			name: 'Programs',
			icon: <ViewModuleRoundedIcon />
		},
		{
			path: '/about',
			name: 'About',
			icon: <InfoRoundedIcon />
		},
		{
			path: '/problems',
			name: 'Problems',
			icon: <FitnessCenterIcon />
		},
		// {
		// 	path: '/profile',
		// 	name: 'Profile',
		// 	icon: <PersonIcon />
		// },
	];
	if (isAdmin) {
		paths.push({
			path: '/admin',
			name: 'Admin Panel',
			icon: <AdminPanelSettingsRoundedIcon />
		});
	}

	//useEffect(() => {
		if (user != null) {
			paths.push({
					path: '/profile',
					name: 'Profile',
					icon: <PersonIcon />
				})
		}
	//}, [])

	const handleToggleExpand = (): void => {
		setExpanded(prev => !prev);
	}

	const handleSignIn = () => {
		signIn();
	}
	
	const handleSignOut = () => {
		signOut();
	}

	const handleSetPath = (path: string): void => {
		setPathname(path);
	}

	return (
		<div className={`sidebar ${expanded ? 'expanded' : 'contracted'}`}>
			<div className="sections">
				{
					paths.map((path: any, index: number) => {
						return (
							<CustomLink
								to={ path.path }
								key={`${index}-sidebar-link`}
							>
								<div
									className={`${path.path === pathname ? 'active' : ''} section`}
									onClick={ () => handleSetPath(path.path) }
								>
									{
										expanded ? (
											<>
												{path.icon}
												<span>
													{ path.name }
												</span>
											</>
										) : (
											path.icon
										)
									}
								</div>
							</CustomLink>
						);
					})
				}
			</div>
			
				<br />
			<div className={`expand-arrow-wrapper ${expanded ? 'row' : 'col'}`}>
				{
					user === null && !userLoading ? (
						<button className={`sign-in-button ${!expanded ? 'expanded' : ''}`} onClick={handleSignIn}>
							<PersonRoundedIcon />
							{
								expanded ? (
									<span>Sign in</span>
								) : <></>
							}
						</button>
					) : (
						<>
					
						<button className={`sign-out-button ${!expanded ? 'expanded' : ''}`} onClick={handleSignOut}>
							<LogoutRoundedIcon />
							{
								expanded ? (
									<>
									<span>Sign out</span>
									</>
								) : <></>
							}
						</button>
						</>
					)
				}
				<button className={`expand-arrow ${!expanded ? 'expanded' : ''}`} onClick={handleToggleExpand}>
					<ChevronLeftIcon />
				</button>
			</div>
		</div>
	);
}