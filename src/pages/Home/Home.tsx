import './Home.scss';
import Card from '../../components/Card/Card';
import { Button } from '@mui/material';
import { addPoints, requestAdminPermissions } from '../../firebase';
import { useEffect, useState } from 'react';
import { getPoints, getUserData } from '../../firebase';
import { PointHistory } from '../../interfaces';

interface Props {
  user: any;
  isAdmin: boolean;
}

export default function Home({ user, isAdmin }: Props) {

	const [points, setPoints] = useState<number | null>(null);
  const [history, setHistory] = useState<PointHistory[]>([]);

	const cardStyle = {
		minWidth: 400,
	}

  const handleRequestPermissions = () => {
    requestAdminPermissions(user);
  };

	useEffect(() => {
		async function handleGetPoints(): Promise<void> {
			const data = await getUserData(user.uid, user.displayName);
			setPoints(data.points);
      setHistory(data.history);
		}
		if(user) handleGetPoints();
	}, [user]);

  const handleAddPoints = () => {
    addPoints(user.uid, user.displayName, "test", 50);
  }

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
            <button onClick={handleAddPoints}> + 50 points </button>
						<div className="history">
							{/* history */}
              <ol>

              {history.map((value, i) => (
                <li> Gained {value.amount} pts from "{value.reason}" </li>
              ))}
              </ol>
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
