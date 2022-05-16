import './Home.scss';
import Card from '../../components/Card/Card';
import { Button } from '@mui/material';
import { requestAdminPermissions } from '../../firebase';
import { useEffect, useState } from 'react';
import { getPoints } from '../../firebase';

interface Props {
  user: any;
  isAdmin: boolean;
}

export default function Home({ user, isAdmin }: Props) {

	const [points, setPoints] = useState<number | null>(null);

	const cardStyle = {
		minWidth: 400,
	}

  const handleRequestPermissions = () => {
    requestAdminPermissions(user);
  };

	useEffect(() => {
		async function handleGetPoints(): Promise<void> {
			const points = await getPoints(user);
			setPoints(points);
		}
		if(user) handleGetPoints();
	}, [user]);

  return (
    <div className='home'>
      {user ? (
				<>
					<h1>Signed in as { user.displayName }</h1>
					<Card className="points" sx={cardStyle}>
						<div className="current-points">
							<sub>Points</sub>
							<span>{ points }</span>
						</div>
						<div className="history">
							{/* history */}
						</div>
					</Card>
				</>
			) : <h1>Not logged in</h1>}
      {!isAdmin && user ? (
        <Card
          sx={{
            display: 'flex',
            gap: '10px',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}
        >
          <h2>Request Admin Permissions</h2>
          <Button
            color='primary'
            onClick={handleRequestPermissions}
            variant='outlined'
          >
            Request permissions
          </Button>
        </Card>
      ) : (
        <></>
      )}
    </div>
  );
}
