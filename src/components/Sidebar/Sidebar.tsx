import './Sidebar.scss';
import CustomLink from '../CustomLink/CustomLink';
import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded';
import LeaderboardRoundedIcon from '@mui/icons-material/LeaderboardRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

export default function Sidebar() {

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
			path: '/about',
			name: 'About',
			icon: <InfoRoundedIcon />
		},
	];

	const handleToggleExpand = (): void => {
		setExpanded(prev => !prev);
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
			<div className="expand-arrow-wrapper">
				<div className={`expand-arrow ${!expanded ? 'expanded' : ''}`} onClick={handleToggleExpand}>
					<ChevronLeftIcon />
				</div>
			</div>
		</div>
	);
}