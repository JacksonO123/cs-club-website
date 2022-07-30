import { addPoints, requestAdminPermissions } from 'src/firebase';
import { useEffect, useState, useContext } from 'react';
import { getUserData } from 'src/firebase';
import { PointHistory } from 'src/interfaces';
import {
  Backdrop,
  Box,
  Button,
  CircularProgress
} from '@mui/material';
import { AdminContext, UserContext } from 'src/Contexts';
import { styled as muiStyled } from '@mui/material/styles';
import { utils } from 'src/style-utils';

import Card from 'src/components/card';
import CardTitle from 'src/components/card-title';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PageTitle from 'src/components/page-title';
import Sub from 'src/components/sub';
import styled from 'styled-components';
import FadeIn from 'src/components/keyframes/fade-in';
import FullCenter from 'src/components/full-center';
import ExpandDown from 'src/components/keyframes/expand-down';

const HomeWrapper = muiStyled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  padding: utils.contentPadding
});

const HomeCards = muiStyled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '28px'
});

const Points = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

interface PointsWrapperProps {
  loading: boolean;
}

const PointsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  align-items: ${(props: PointsWrapperProps) => props.loading ? 'center' : 'flex-end'};
`

const FullHistoryLink = muiStyled('span')({
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

const CurrentPoints = muiStyled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  width: 'fit-content'
});

const History = muiStyled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: utils.itemGap,
});

const FullHistoryWrapper = muiStyled('div')({
  padding: '0 20px 20px 20px'
});

const HistoryItem = muiStyled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});

interface AmountProps {
  type: 'positive' | 'negative';
}

const Amount = styled.span`
  font-size: 12px;
  border-radius: 50px;
  display: flex;
  align-items: center;
  padding: 6px 10px;
  ${(props: AmountProps): string => (
    props.type === 'positive'
      ? `
          color: #28a745;
          border: 1px solid #28a745;
        `
      : `
          color: #dc3545;
          border: 1px solid #dc3545;
        `
  )}
`;

const NegativeSignedValue = styled.div`
  margin-left: 10px;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: calc(-50% - 3px);
    height: 1px;
    width: 7px;
    background: red;
  }
`;

interface HistoryTitleProps {
  sx: object;
}

const HistoryTitle = styled.span`
  position: sticky;
  top: 0;
  background: white;
  padding: 20px 20px 12px 20px;
  z-index: 200;
  transition: 0.1s;
  ${(props: HistoryTitleProps): string => {
    return JSON.stringify(props.sx).replace(/\{/g, '').replace(/"/g, '').replace(/'/g, '');
  }}
`;

const Home = () => {

  const user: any = useContext(UserContext);
  const isAdmin: boolean | null = useContext(AdminContext);

  const [points, setPoints] = useState<number | null>(null);
  const [history, setHistory] = useState<PointHistory[]>([]);
  const [showingFullHistory, setShowingFullHistory] = useState<boolean>(false);
  const [historyScrollTop, setHistoryScrollTop] = useState<number>(0);
  const [hasUserResponse, setHasUserResponse] = useState<boolean>(false);

  const cardStyle = {
    minWidth: 300,
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

  const shadowSx: string = '0px 0px 10px 1px rgb(0 0 0 / 20%)';

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
        setHasUserResponse(true);
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

  const SignedValue = ({ value }: { value: number }) => {
    const temp = Math.abs(value);

    return (
      value >= 0
        ? <>+ {temp}</>
        : <NegativeSignedValue>{temp}</NegativeSignedValue>
    );
  };

  return (
    <HomeWrapper>
      {user && <PageTitle>Signed in as {user?.displayName}</PageTitle>}
      <HomeCards>
        {user ? (
          <Card sx={cardStyle}>
            <FadeIn>
              <Points>
                <PointsWrapper loading={+!hasUserResponse}>
                  <CurrentPoints>
                    <Sub>Points</Sub>
                    <span>{points}</span>
                  </CurrentPoints>
                  {hasUserResponse && (
                    <FadeIn>
                      <FullHistoryLink
                        onClick={handleShowFullHistory}
                      >
                        Show all
                        <ChevronRightIcon />
                      </FullHistoryLink>
                    </FadeIn>
                  )}
                </PointsWrapper>
                <Button
                  onClick={() => handleAddPoints('epic', 50)}
                  variant="outlined"
                  color="info"
                >
                  Epic
                </Button>
                <Button
                  onClick={() => handleAddPoints('epic', -50)}
                  variant="outlined"
                  color="error"
                >
                  Not Epic
                </Button>
                <FadeIn>
                  <ExpandDown>
                    <History>
                      {hasUserResponse
                        ? history.length > 0
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
                                    <SignedValue value={value.amount} />
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
                          )
                        : (
                          <FullCenter>
                            <CircularProgress color="info" />
                          </FullCenter>
                        )
                      }
                    </History>
                  </ExpandDown>
                </FadeIn>
                <Backdrop
                  sx={{
                    color: '#fff',
                    zIndex: (theme: any) => theme.zIndex.drawer + 1,
                  }}
                  open={showingFullHistory}
                  onClick={handleCloseFullHistory}
                >
                  <Card
                    sx={historyCardSx}
                    onClick={(e: any) => e.stopPropagation()}
                    onScroll={(e: any) => handleHistoryCardScroll(e)}
                  >
                    <HistoryTitle sx={historyScrollTop > 0 ? { 'box-shadow': shadowSx } : {}}>
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
                                <SignedValue value={value.amount} />
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
            </FadeIn>
          </Card>
        ) : (
          <PageTitle>Not logged in</PageTitle>
        )}
        {isAdmin === false && (
          <FadeIn>
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
          </FadeIn>
        )}
      </HomeCards>
    </HomeWrapper>
  );
};

export default Home;
