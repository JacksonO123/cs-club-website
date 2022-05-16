import './Announcements.scss';
import {
	getAnnouncements
} from '../../firebase';
import { useState, useEffect } from 'react';
import NewAnnouncement from './NewAnnouncement';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Announcement from './Announcement';

interface Props {
	user: any;
}

export default function Annoucements({ user }: Props) {

	const [announcements, setAnnouncements] = useState<any[]>([]);
	const [addingAnnouncement, setAddingAnnouncement] = useState<boolean>(false);

	const fabStyles = {
		position: 'absolute',
		bottom: 30,
		right: 30,
	}

	const handleAddingAnnouncement = (): void => {
		setAddingAnnouncement(true);
	}

	const handleCancelAddingAnnouncement = (): void => {
		setAddingAnnouncement(false);
	}

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
				addingAnnouncement ? (
					<NewAnnouncement
						user={user}
						onSubmit={handleCancelAddingAnnouncement}
						onCancel={handleCancelAddingAnnouncement}
					/>
				) : <></>
			}
			{
				announcements.length > 0 ? (
					announcements.map((announcement: any, index: number): any => (
						<Announcement key={`${index}-announcement-id`} announcement={announcement} />
					))
				) : (
					<h1>No announcements yet.</h1>
				)
			}
			<Fab sx={fabStyles} color="primary" onClick={handleAddingAnnouncement}>
				<AddIcon />
			</Fab>
		</div>
	);
}