import './Home.scss';
import Card from '../../components/Card/Card';
import {
	Button
} from '@mui/material';
import {
	requestAdminPermissions
} from '../../firebase'

interface Props {
	user: any;
}

export default function Home({ user }: Props) {
	
	const handleRequestPermissions = () => {
		requestAdminPermissions(user);
	}

	return (
		<div className="home">
			<h1>Home</h1>
			<Card sx={{display: 'flex', gap: '10px', flexDirection: 'column', alignItems: 'flex-start'}}>
				<h2>Request Admin Permissions</h2>
				<Button color="primary" onClick={handleRequestPermissions}>Request permissions</Button>
			</Card>
		</div>
	);
}