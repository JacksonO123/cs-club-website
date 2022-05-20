import { Routes, Route } from 'react-router-dom';
import '../../utils.scss';
import './Router.scss';
import Home from '../Home/Home';
import The404Page from '../The404Page/The404Page';
import Announcements from '../Announcements/Announcements';
import Leaderboard from '../Leaderboard/Leaderboard';
import About from '../About/About';
import Programs from '../Programs/Programs';
import AdminPanel from '../AdminPanel/AdminPanel';
import Problems from '../Problems/Problems';
import Challenges from '../Challenges/Challenges';
import Challenge from '../Challenge/Challenge';

interface Props {
	user: any;
	isAdmin: boolean;
}

export default function Router({ user, isAdmin }: Props) {
	return (
		<div className="full router-wrapper">
			<Routes>
				<Route path="/" element={<Home user={user} isAdmin={isAdmin} />} />
				<Route path="/announcements" element={<Announcements user={user} isAdmin={isAdmin} />} />
				<Route path="/leaderboard" element={<Leaderboard />} />
				<Route path="/about" element={<About />} />
				<Route path="/programs" element={<Programs />} />
				<Route path="/admin" element={<AdminPanel isAdmin={isAdmin} />} />
				<Route path="/problems" element={<Problems />} />
				<Route path = "/challenges" element = {<Challenges />} />
				<Route path = "/solve/:id" element = {<Challenge user = {user} />}  />
 				<Route path="*" element={<The404Page />} />
			</Routes>
		</div>
	);
}