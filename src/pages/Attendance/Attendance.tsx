import { useEffect, useState } from "react";
import { addPoints, getLeaderboard } from "../../firebase";
import { PointsType } from "../../interfaces";

export default function Attendance() {
    const [members, setMembers] = useState<PointsType[]>([]);

	useEffect(() => {	
		(async function handleGetLeaderboard(): Promise<void> {
			try {
				const leaderboardData = await getLeaderboard();
				setMembers(leaderboardData);
			} catch (e: any) {}
		})();
		
	}, [])

    const markAsPresent = async (member: any) => {
        await addPoints(member.uid, member.name, "attending meeting", 50);
    }
    return (
        <div>
            <h1> Attendance </h1>
            <ul>
                {members.map((member, i) => (
                    <li key = {i}>
                        {member.name}
                        <button onClick = {() => markAsPresent(member)}> Mark as Present </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}