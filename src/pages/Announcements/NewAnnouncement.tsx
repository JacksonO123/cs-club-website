import './NewAnnouncement.scss';
import { getAnnouncements, db } from '../../firebase';
import {
	doc,
	setDoc
} from 'firebase/firestore';
const create = async (): Promise<void> => {
	const title = document.getElementById('title') as HTMLInputElement;	
	const content = document.getElementById('content') as HTMLInputElement;
	const annoucements = await getAnnouncements();
	const newAnnouncement = {
		title: title.value,
		content: content.value,
		createdAt: new Date().toISOString()
	}
	annoucements.push(newAnnouncement);
	await setDoc(doc(db, 'announcements', 'annoucement'), {annoucements});
}

export default function NewAnnouncement() {
	return (
		<div className="full announcements-wrapper">
			<h2>Create a New Annoucement</h2>
			<input type="text" placeholder="Title" id="title" />
			<textarea placeholder="Description" id="description"/>
			<button onClick={create}>Create</button>
		</div>
	);
}