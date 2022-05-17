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
			date: `${date.getHours()}:${date.getMinutes()} ${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`,
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