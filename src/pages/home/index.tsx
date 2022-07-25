import { Button } from '@mui/material';
import { addPoints, requestAdminPermissions } from 'src/firebase';
import { useEffect, useState, useContext } from 'react';
import { getUserData } from 'src/firebase';
import { PointHistory } from 'src/interfaces';
import { Backdrop, Box } from '@mui/material';
import { AdminContext, UserContext } from 'src/Contexts';
import { styled } from '@mui/material/styles';
import { utils } from 'src/style-utils';

import Card from 'src/components/card';
import CardTitle from 'src/components/card-title';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PageTitle from 'src/components/page-title';
import Sub from 'src/components/sub';

import 'src/utils.scss';

const HomeWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: utils.contentPadding
});

const HomeCards = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '28px'
});

const Points = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  '& > *': {
    color: 'black'
  }
});

const PointsWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-end',
  justifyContent: 'space-between'
});

const FullHistoryLink = styled('span')({
  color: '#007bff',
  cursor: 'pointer',
  userSelect: 'none',
  '--webkit-user-select': 'none',
  '--moz-user-select': 'none',
  '--ms-user-select': 'none',
  alignSelf: 'flex-end',
  fontSize: '14px',
  svg: {
    height: '20px',
    aspectRatio: 1,
    transform: 'translateY(4px)'
  }
});

const CurrentPoints = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: 'fit-content'
});

const History = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: utils.itemGap,
});

const FullHistoryWrapper = styled('div')({
  padding: '0 20px 20px 20px'
});

const HistoryItem = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

interface AmountProps {
  type: 'positive' | 'negative';
}

const Amount = styled('span')(({ type }: AmountProps) => ({
  fontSize: '12px',
  borderRadius: '50px',
  display: 'flex',
  alignItems: 'center',
  padding: '6px 10px',
  ...(
    type === 'positive'
      ? {
        color: '#28a745',
        border: '1px solid #28a745'
      }
      : {
        color: '#dc3545',
        border: '1px solid #dc3545'
      }
  )
}));

const HistoryTitle = styled('span')({
  position: 'sticky',
  top: 0,
  background: 'white',
  padding: '20px 20px 12px 20px'
});

export default function Home() {

  const user: any = useContext(UserContext);
  const isAdmin: boolean | null = useContext(AdminContext);

  const [points, setPoints] = useState<number | null>(null);
  const [history, setHistory] = useState<PointHistory[]>([]);
  const [showingFullHistory, setShowingFullHistory] = useState<boolean>(false);
  const [historyScrollTop, setHistoryScrollTop] = useState<number>(0);

  const cardStyle = {
    minWidth: 300,
    // overflowY: 'scroll !important'
  };

  const historyCardSx = {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '400px',
    maxHeight: '600px',
    overflowY: 'scroll',
    scrollBehavior: 'smooth',
    padding: '0 !important',
    transition: '0.15s',
  };

  const shadowSx = {
    boxShadow: '0px 0px 10px 1px rgb(0 0 0 / 20%)'
  };

  const handleRequestPermissions = () => {
    requestAdminPermissions(user);
  };

  const handleShowFullHistory = () => {
    setShowingFullHistory(true);
    console.log(history);
  };

  const handleCloseFullHistory = (): void => {
    setShowingFullHistory(false);
  };

  useEffect(() => {
    if (user) {
      (async (): Promise<void> => {
        const data = await getUserData(user);
        const points = data.history
          .map((item: any) => item.amount)
          .reduce((acc: number, curr: number) => acc + curr, 0);
        setPoints(points);
        setHistory(data.history);
      })();
    }
  }, [user]);

  const handleHistoryCardScroll = (e: any): void => {
    setHistoryScrollTop(e.target.scrollTop);
  };

  const handleAddPoints = (reason: string, amount: number): void => {
    addPoints(user, reason, amount);
  };

  return (
    <HomeWrapper>
      {user && <PageTitle>Signed in as {user?.displayName}</PageTitle>}
      <HomeCards>
        {user ? (
          <Card sx={cardStyle}>
            <Points>
              <PointsWrapper>
                <CurrentPoints>
                  <Sub>Points</Sub>
                  <span>{points}</span>
                </CurrentPoints>
                <FullHistoryLink
                  onClick={handleShowFullHistory}
                >
                  Show all
                  <ChevronRightIcon />
                </FullHistoryLink>
              </PointsWrapper>
              <Button
                color="success"
                onClick={() => handleAddPoints('epic', 50)}
              >
                Epic
              </Button>
              <History>
                {history.length > 0
                  ? (
                    history
                      .filter((_: any, index: number): boolean => index < 4)
                      .map((value: PointHistory, index: number) => (
                        <HistoryItem key={`history-item-${index}`}>
                          <Box>
                            {value.reason}
                            <Sub>{value.date}</Sub>
                          </Box>
                          <Amount type={value.amount >= 0 ? 'positive' : 'negative'}>
                            {value.amount >= 0
                              ? `+${value.amount}`
                              : `-${value.amount}`}
                          </Amount>
                        </HistoryItem>
                      ))
                  ) : (
                    <CardTitle
                      size="large"
                      sx={{
                        marginTop: '8px'
                      }}
                    >No history</CardTitle>
                  )}
              </History>
              <Backdrop
                sx={{
                  color: '#fff',
                  zIndex: (theme: any) => theme.zIndex.drawer + 1,
                }}
                open={showingFullHistory}
                onClick={handleCloseFullHistory}
              >
                <Card
                  className="full-history-card"
                  sx={historyCardSx}
                  onClick={(e: any) => e.stopPropagation()}
                  onScroll={(e: any) => handleHistoryCardScroll(e)}
                >
                  <HistoryTitle sx={historyScrollTop > 0 ? shadowSx : {}}>
                    <CardTitle size="large">Point history</CardTitle>
                  </HistoryTitle>
                  <FullHistoryWrapper>
                    <History>
                      {history.length > 0 ? (
                        history.map((value: PointHistory, index: number) => (
                          <HistoryItem key={`full-history-item-${index}`}>
                            <Box>
                              {value.reason}
                              <Sub>{value.date}</Sub>
                            </Box>
                            <Amount type={value.amount >= 0 ? 'positive' : 'negative'}>
                              {value.amount >= 0
                                ? `+${value.amount}`
                                : `-${value.amount}`}
                            </Amount>
                          </HistoryItem>
                        ))
                      ) : (
                        <CardTitle size="small">No history</CardTitle>
                      )}
                    </History>
                  </FullHistoryWrapper>
                </Card>
              </Backdrop>
            </Points>
          </Card>
        ) : (
          <PageTitle>Not logged in</PageTitle>
        )}
        {(!isAdmin && user) && (
          <Card
            sx={{
              display: 'flex',
              gap: '10px',
              flexDirection: 'column',
              alignItems: 'flex-start',
              minWidth: 300,
            }}
          >
            <CardTitle size="large">Request Admin Permissions</CardTitle>
            <Button
              color="primary"
              onClick={handleRequestPermissions}
              variant="outlined"
            >
              Request permissions
            </Button>
          </Card>
        )}
      </HomeCards>
    </HomeWrapper>
  );
}
