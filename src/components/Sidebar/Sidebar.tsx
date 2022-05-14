import './Sidebar.scss';
import CustomLink from '../CustomLink/CustomLink';
import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ViewModuleRoundedIcon from '@mui/icons-material/ViewModuleRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import {
	signIn,
	signOut,
} from '../../firebase';

interface Props {
	user?: any;
	userLoading?: boolean;
}

export default function Sidebar({ user, userLoading }: Props) {

	const [active, setActive] = useState<number>(0);
	const [expanded, setExpanded] = useState<boolean>(true);
	const paths = [
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
	];

	const handleToggleExpand = (): void => {
		setExpanded(prev => !prev);
	}

	const handleSignIn = () => {
		signIn();
	}
	
	const handleSignOut = () => {
		signOut();
	}

	const isValidUser = () => {
		return user !== null && !userLoading;
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
									className={`${active === index ? 'active' : ''} section`}
									onClick={ () => setActive(index) }
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
						<button className={`sign-out-button ${!expanded ? 'expanded' : ''}`} onClick={handleSignOut}>
							<LogoutRoundedIcon />
							{
								expanded ? (
									<span>Sign out</span>
								) : <></>
							}
						</button>
					)
				}
				<button className={`expand-arrow ${!expanded ? 'expanded' : ''}`} onClick={handleToggleExpand}>
					<ChevronLeftIcon />
				</button>
			</div>
		</div>
	);
}