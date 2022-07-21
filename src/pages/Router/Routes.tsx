import { RouteType } from '../../interfaces';
import Home from '../Home/Home';
import Announcements from '../Announcements/Announcements';
import Leaderboard from '../Leaderboard/Leaderboard';
import About from '../About/About';
import AdminPanel from '../AdminPanel/AdminPanel';
import Problems from '../Problems/Problems';
import Attendance from '../Attendance/Attendance';
import Challenges from '../Challenges/Challenges';
import Challenge from '../Challenge/Challenge';
import The404Page from '../The404Page/The404Page';

const routes: RouteType[] = [
	{
		path: '/',
		element: <Home />
	},
	{
		path: '/announcements',
		element: <Announcements />
	},
	{
		path: '/leaderboard',
		element: <Leaderboard />
	},
	{
		path: '/about',
		element: <About />
	},
	{
		path: '/admin',
		element: <AdminPanel />
	},
	{
		path: '/problems',
		element: <Problems />
	},
	{
		path: '/attendance',
		element: <Attendance />
	},
	{
		path: '/challenges',
		element: <Challenges />
	},
	{
		path: '/challenges/:id',
		element: <Challenge />
	},
	{
		path: '*',
		element: <The404Page />
	},
];

export default routes;