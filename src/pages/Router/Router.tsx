import { Routes, Route } from 'react-router-dom';
import '../../utils.scss';
import './Router.scss';
import Home from '../Home/Home';
import The404Page from '../The404Page/The404Page';
import Announcements from '../Announcements/Announcements';
import Leaderboard from '../Leaderboard/Leaderboard';
import About from '../About/About';

export default function Router() {
	return (
		<div className="full router-wrapper">
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/announcements" element={<Announcements />} />
				<Route path="/leaderboard" element={<Leaderboard />} />
				<Route path="/about" element={<About />} />
				<Route path="*" element={<The404Page />} />
			</Routes>
		</div>
	);
}