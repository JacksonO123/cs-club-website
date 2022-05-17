import { useEffect, useState } from 'react';
import { getLeaderboard } from '../../firebase';
import './Leaderboard.scss';
import type { PointsType } from '../../interfaces';

export default function Leaderboard() {
	const [leaderboard, setLeaderboard] = useState<PointsType[]>([]);

	useEffect(() => {	
		(async (): Promise<void> => {
			try {
				const leaderboardData = await getLeaderboard();
				setLeaderboard(leaderboardData);
			} catch (e: any) {}
		})();
	}, [])
	return (
		<div className="leaderboard-page">
		  <h1>Leaderboard </h1>
		  	<ul className='leaderboard'>
			{
				leaderboard.sort((a: PointsType, b:PointsType) => b.points - a.points).map((data: PointsType, i:number) => (
					<li key={i}>{ data.name } - { data.points }</li>
				))
			}
			</ul>
		</div>
	);
}