import './Announcements.scss';
import {
	getAnnouncements
} from '../../firebase';
import { useState, useEffect } from 'react';

export default function Annoucements() {

	const [announcements, setAnnouncements] = useState<any[]>([]);

	const handleGetAnnouncements = async (): Promise<void> => {
		const tempAnnouncements = await getAnnouncements();
		setAnnouncements(tempAnnouncements);
		console.log(announcements);
	}

	useEffect(() => {
		handleGetAnnouncements();
	}, []);

	return (
		<div className="announcements">
			{
				announcements.length > 0 ? (
					<h1>There are announcements</h1>
				) : (
					<h1>No announcements yet.</h1>
				)
			}
		</div>
	);
}