import './NewAnnouncement.scss';
import { useState } from 'react';
import type { AnnouncementType } from '../../interfaces';
import { addAnnouncement } from '../../firebase';
import Card from '../../components/Card/Card';
import {
	Button,
	TextField
} from '@mui/material';

interface Props {
	user: any;
	onSubmit: Function,
	onCancel: Function
}

function formatTime(time: Date): string {
	let minutes = `${time.getMinutes()}`;
	if (minutes.length < 2) {
		minutes = `${minutes}0`;
	}
	let timeString = `${time.getHours()}:${minutes} AM`;
	if (time.getHours() > 12) {
		timeString = `${time.getHours() - 12}:${minutes} PM`;
	}
	return `${timeString} ${time.getMonth()+1}/${time.getDate()}/${time.getFullYear()}`
}

export default function NewAnnouncement({ user, onSubmit, onCancel }: Props) {

	const [content, setContent] = useState<string>('');

	const btnStyles = {
		width: 125,
	}

	const createAnnouncement = async (): Promise<void> => {
		let date = new Date();
		const newAnnouncement: AnnouncementType = {
			from: user.displayName,
			fromPhotoUrl: user.photoURL,
			content: content,
			date: formatTime(date),
			timestamp: date.getTime()
		}
		addAnnouncement(newAnnouncement);
		onSubmit();
	}

	const handleCancel = (): void => {
		onCancel();
	}

	return (
		<Card className="new-announcement-wrapper">
			<h2>Create a New Annoucement</h2>
			<div className="input-wrapper">
				<TextField
					label="Content"
					variant="filled"
					fullWidth
					multiline
					rows={3}
					onChange={(e: any): void => setContent(e.target.value)}
					value={content}
				/>
				<div className="controls">
					<Button
						sx={btnStyles}
						onClick={handleCancel}
						color="secondary"
					>Cancel</Button>
					<Button
						sx={btnStyles}
						onClick={createAnnouncement}
						variant="outlined"
					>Post</Button>
				</div>
			</div>
		</Card>
	);
}