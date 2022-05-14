import './Sidebar.scss';
import CustomLink from '../CustomLink/CustomLink';

export default function Sidebar() {
	return (
		<div className="sidebar">
			<CustomLink to="/">
				<div className="section">Home</div>
			</CustomLink>
			<hr></hr>
			<CustomLink to="/updates">
				<div className="section">Upates</div>
			</CustomLink>
			<hr></hr>
			<CustomLink to="/announcements">
				<div className="section">Announcements</div>
			</CustomLink>
			<hr></hr>
			<CustomLink to="/leaderboard">
				<div className="section">Leader Board</div>
			</CustomLink>
			<hr></hr>
			<CustomLink to="/about">
				<div className="section">About</div>
			</CustomLink>
		</div>
	);
}