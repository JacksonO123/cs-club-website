import React, { useEffect, useState, useContext } from 'react';
import { addPoints, getLeaderboard } from 'src/firebase';
import { onSnapshot, collection } from 'firebase/firestore';
import { Button } from '@mui/material';
import { v4 } from 'uuid';
import { db } from 'src/firebase';
import { AdminContext } from 'src/Contexts';
import { styled } from '@mui/material/styles'
import { utils } from 'src/style-utils';

import type { UserType, PointHistory } from 'src/interfaces';

import Card from 'src/components/card';
import ProfileBox from 'src/components/profile-box';
import PageTitle from 'src/components/page-title';
import ProfileBoxWrapper from 'src/components/profile-box-wrapper';
import ExpandDown from 'src/components/keyframes/expand-down';
import FadeIn from 'src/components/keyframes/fade-in';

const AttendanceWrapper = styled('div')({
  padding: utils.contentPadding,
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const AttendanceCards = styled('div')({
  display: 'flex',
  gap: '24px',
});

const Attendance = () => {

  const isAdmin: boolean | null = useContext(AdminContext);

  const [members, setMembers] = useState<UserType[]>([]);
  const memberCardStyle = {
    minWidth: 400,
  };

  const getCurrentDateString = (): string => {
    return new Date().toLocaleDateString();
  };

  useEffect(() => {
    (async function handleGetLeaderboard(): Promise<void> {
      const leaderboardData = await getLeaderboard();
      setMembers(leaderboardData);
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
    if (!checkAlreadyMarked(member)) {
      await addPoints(member, 'attending meeting', 50);
    }
  };

  const CurrentDate = (): React.ReactElement => {
    return <>{getCurrentDateString()}</>;
  }

  return (
    <AttendanceWrapper>
      {isAdmin
        ? (
          <>
            <PageTitle>Attendance for {<CurrentDate />}</PageTitle>
            <AttendanceCards>
              <FadeIn>
                <Card sx={memberCardStyle}>
                  <ExpandDown>
                    <ProfileBoxWrapper>
                      {members.map((member: any): React.ReactNode => (
                        <ProfileBox user={member} key={v4()}>
                          <Button color="success" onClick={() => markAsPresent(member)} disabled={checkAlreadyMarked(member)}>
                            Present
                          </Button>
                        </ProfileBox>
                      ))}
                    </ProfileBoxWrapper>
                  </ExpandDown>
                </Card>
              </FadeIn>
            </AttendanceCards>
          </>
        )
        : <PageTitle>You do not have access to this page. Sorry!</PageTitle>
      }
    </AttendanceWrapper>
  );
};

export default Attendance;
