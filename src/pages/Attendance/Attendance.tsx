import React from 'react';
import { useEffect, useState } from 'react';
import { addPoints, getLeaderboard } from '../../firebase';
import type { UserType, PointHistory } from '../../interfaces';
import './Attendance.scss';
import { db } from '../../firebase';
import { onSnapshot, collection } from 'firebase/firestore';
import Card from '../../components/Card/Card';
import ProfileBox from '../../components/ProfileBox/ProfileBox';
import { Button } from '@mui/material';

export default function Attendance() {
  const [members, setMembers] = useState<UserType[]>([]);
  const memberCardStyle = {
    minWidth: 400,
  };

  useEffect(() => {
    (async function handleGetLeaderboard(): Promise<void> {
      try {
        const leaderboardData = await getLeaderboard();
        console.log(leaderboardData);
        setMembers(leaderboardData);
      } catch (e: any) {}
    })();
    onSnapshot(collection(db, 'users'), (snap: any) => {
      const data = snap.docs.map((doc: any) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setMembers(data);
    });
  }, []);

  const checkAlreadyMarked = (member: any): boolean => {
    let alreadyMarked: boolean = false;
    member.history.forEach((val: PointHistory, index: number) => {
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
    if (!checkAlreadyMarked(member)) {
      await addPoints(member, 'attending meeting', 50);
    }
  };

  return (
    <div className="attendance">
      <h1> Attendance for {new Date().toLocaleDateString()}</h1>
      <div className="attendance-cards">
        <Card className="members" sx={memberCardStyle}>
          {members.map(
            (member: any, i: number): React.ReactNode => (
              <ProfileBox user={member} key={`${i}-attendance-item`}>
                {checkAlreadyMarked(member) ? (
                  <span className="sub">Present</span>
                ) : (
                  <Button color="success" onClick={() => markAsPresent(member)}>
                    Present
                  </Button>
                )}
              </ProfileBox>
            )
          )}
        </Card>
      </div>
    </div>
  );
}
