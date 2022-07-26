import { useEffect, useState } from 'react';
import { getLeaderboard } from 'src/firebase';
import { styled } from '@mui/material/styles';
import { utils } from 'src/style-utils';

import type { PointHistory, UserType } from 'src/interfaces';

import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Card from 'src/components/card';
import PageTitle from 'src/components/page-title';
import Sub from 'src/components/sub';

const LeaderboardWrapper = styled('div')({
  padding: utils.contentPadding,
  display: 'flex',
  flexDirection: 'column',
  gap: utils.itemGap,
  maxHeight: '100%',
});

const LeaderboardHeader = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: utils.cardPadding,
  paddingBottom: '12px',
  position: 'sticky',
  top: 0,
  background: 'white',
  zIndex: 5,
});

const LeaderboardContent = styled('div')({
  padding: utils.cardPadding,
  paddingTop: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: utils.itemGap,
});

const LeaderboardItem = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const PlaceWrapper = styled('span')({
  height: 24,
  width: 24,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 1px 0 1px'
});

const AbsolutePlaceWrapper = styled('span')({
  position: 'relative',
  span: {
    position: 'absolute',
    top: '3.5px',
    left: '9.5px',
    color: 'white',
    fontSize: '10px'
  }
});

const DataWrapper = styled('span')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  gap: utils.itemGap
});

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<UserType[]>([]);
  const [leaderbaordScroll, setLeaderboardScroll] = useState<number>(0);
  const goldColor = '#f5ce00';
  const silverColor = '#C0C0C0';
  const bronzeColor = '#CD7F32';

  useEffect(() => {
    (async (): Promise<void> => {
      const leaderboardData = await getLeaderboard();
      setLeaderboard(leaderboardData);
    })();
  }, []);

  const handleScroll = (e: any): void => {
    setLeaderboardScroll(e.target.scrollTop);
  };

  const getPointsFromHistory = (history: PointHistory[]) => {
    return history
      .map((item: any) => item.amount)
      .reduce((acc: number, curr: number) => acc + curr, 0);
  };

  const leaderboardSx = {
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    minWidth: '400px',
    maxWidth: '800px',
    maxHeight: '100%',
    overflowY: 'scroll'
  };

  const leaderboardShadowSx = {
    boxShadow: '0px 0px 10px 1px rgb(0 0 0 / 20%)'
  };

  return (
    <LeaderboardWrapper>
      <PageTitle>Leaderboard</PageTitle>
      <Card sx={leaderboardSx} onScroll={handleScroll}>
        <LeaderboardHeader sx={leaderbaordScroll > 0 ? leaderboardShadowSx : {}}>
          <Sub>Name</Sub>
          <Sub>Points</Sub>
        </LeaderboardHeader>
        <LeaderboardContent>
          {leaderboard.length > 0 && (
            leaderboard
              .sort((a: UserType, b: UserType) => getPointsFromHistory(b.history) - getPointsFromHistory(a.history))
              .map((data: UserType, i: number) => (
                <LeaderboardItem key={`leaderbaord-item-${i}`}>
                  {i === 0 ? (
                    <AbsolutePlaceWrapper>
                      <EmojiEventsIcon sx={{ color: goldColor }} />
                      <span>1</span>
                    </AbsolutePlaceWrapper>
                  ) : i === 1 ? (
                    <AbsolutePlaceWrapper>
                      <EmojiEventsIcon sx={{ color: silverColor }} />
                      <span>2</span>
                    </AbsolutePlaceWrapper>
                  ) : i === 2 ? (
                    <AbsolutePlaceWrapper>
                      <EmojiEventsIcon sx={{ color: bronzeColor }} />
                      <span>3</span>
                    </AbsolutePlaceWrapper>
                  ) : (
                    <PlaceWrapper>{i + 1}</PlaceWrapper>
                  )}
                  <DataWrapper>
                    <span>{data.name}</span>
                    <span>{getPointsFromHistory(data.history)}</span>
                  </DataWrapper>
                </LeaderboardItem>
              ))
          )}
        </LeaderboardContent>
      </Card>
    </LeaderboardWrapper>
  );
};

export default Leaderboard;
