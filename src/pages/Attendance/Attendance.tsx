import { useEffect, useState } from 'react';
import { addPoints, getLeaderboard } from '../../firebase';
import { PointsType, PointHistory } from '../../interfaces';
import './Attendance.scss';

export default function Attendance() {
  const [members, setMembers] = useState<PointsType[]>([]);

  useEffect(() => {
    (async function handleGetLeaderboard(): Promise<void> {
      try {
        const leaderboardData = await getLeaderboard();
        setMembers(leaderboardData);
      } catch (e: any) {}
    })();
  }, []);
  const checkAlreadyMarked = (member: any): boolean => {
    let alreadyMarked: boolean = false;
    member.history.forEach((val: PointHistory) => {
      if (
        val.reason === 'attending meeting' &&
        val.date === new Date().toLocaleDateString()
      ) {
        alreadyMarked = true;
        return;
      }
    });
    return alreadyMarked;
  };
  const markAsPresent = async (member: any) => {
    if (!checkAlreadyMarked(member))
      await addPoints(member.uid, member.name, 'attending meeting', 50);
  };
  return (
    <div className="attendance">
      <h1> Attendance for {new Date().toLocaleDateString()}</h1>
      <ul>
        {members.map((member, i) => (
          <li key={i}>
            {member.name}
            {checkAlreadyMarked(member) ? (
              ' Already marked present'
            ) : (
              <button onClick={() => markAsPresent(member)}>
                Mark as Present
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
