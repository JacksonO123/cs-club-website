import { RouteType } from 'src/interfaces';
import Home from '../home';
import Announcements from '../announcements';
import Leaderboard from '../leaderboard';
import About from '../About';
import AdminPanel from '../admin-panel';
import Problems from '../problems';
import Attendance from '../attendance';
import Challenges from '../Challenges';
import Challenge from '../challenge';
import The404Page from '../404-page';

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