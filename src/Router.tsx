import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './utils.scss';
import Home from './pages/Home/Home';
import Updates from './pages/Updates/Updates';
import The404Page from './pages/The404Page/The404Page';
import Announcements from './pages/Announcements/Announcements';
import Leaderboard from './pages/Leaderboard/Leaderboard';
import About from './pages/About/About';

export default function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/updates" element={<Updates />} />
			<Route path="/announcements" element={<Announcements />} />
			<Route path="/leaderboard" element={<Leaderboard />} />
			<Route path="/about" element={<About />} />
			<Route path="*" element={<The404Page />} />
		</Routes>
	);
}