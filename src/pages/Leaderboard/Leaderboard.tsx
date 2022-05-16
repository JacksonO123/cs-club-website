import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getLeaderboard } from '../../firebase';
import './Leaderboard.scss';

export default function Leaderboard() {
	const [leaderboard, setLeaderboard] = useState<any[]>([]);

	useEffect(() => {	
		async function handleGetLeaderboard(): Promise<void> {
			const leaderboardData = await getLeaderboard();
			setLeaderboard(leaderboardData);
		}
		handleGetLeaderboard();
	}, [])
	return (
		<div className="leaderboard-page">
		  <h1>Leaderboard </h1>
			{
				leaderboard.map((data: any, i:number) => (
					<div key={i}>{ data.name } - { data.points }</div>
				))
			}
		</div>
	);
}