import './Home.scss';
import '../../utils.scss';
import Card from '../../components/Card/Card';
import { Button } from '@mui/material';
import { addPoints, requestAdminPermissions } from '../../firebase';
import { useEffect, useState } from 'react';
import { getUserData } from '../../firebase';
import { PointHistory } from '../../interfaces';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Backdrop } from '@mui/material';

interface Props {
  user: any;
  isAdmin: boolean;
}

export default function Home({ user, isAdmin }: Props) {
  const [points, setPoints] = useState<number | null>(null);
  const [history, setHistory] = useState<PointHistory[]>([]);
  const [showingFullHistory, setShowingFullHistory] = useState<boolean>(false);
  const [historyScrollTop, setHistoryScrollTop] = useState<number>(0);

  const cardStyle = {
    minWidth: 300,
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
        const data = await getUserData(user.uid, user.displayName);
        setPoints(data.points);
        setHistory(data.history);
      })();
    }
  }, [user]);

  const handleAddPoints = (): void => {
    addPoints(user.uid, user.displayName, 'test', 50);
  };

  const handleHistoryCardScroll = (e: any): void => {
    setHistoryScrollTop(e.target.scrollTop);
  };

  return (
    <div className="home">
      <h1>Signed in as {user?.displayName}</h1>
      <div className="home-cards">
        {user ? (
          <>
            <Card className="points" sx={cardStyle}>
              <div className="points-wrapper">
                <div className="col current-points">
                  <div className="sub">Points</div>
                  <span>{points}</span>
                </div>
                <span
                  className="show-full-history-link"
                  onClick={handleShowFullHistory}
                >
                  Show all
                  <ChevronRightIcon />
                </span>
              </div>
              <button onClick={handleAddPoints}> + 50 points</button>
              <div className="history">
                {history
                  .filter((_: any, index: number): boolean => index < 4)
                  .map((value: PointHistory, index: number) => (
                    <div key={`${index}-full-history-item`}>
                      <span>
                        {value.reason}
                        <div className="sub">{value.date}</div>
                      </span>
                      <span
                        className={`amount ${
                          value.amount >= 0 ? 'positive' : 'negative'
                        }`}
                      >
                        {value.amount >= 0
                          ? `+${value.amount}`
                          : `-${value.amount}`}
                      </span>
                    </div>
                  ))}
              </div>
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
                  onClick={(e: any) => e.stopPropagation()}
                  onScroll={(e: any) => handleHistoryCardScroll(e)}
                >
                  <span
                    className={`title ${historyScrollTop > 0 ? 'shadow' : ''}`}
                  >
                    <h3>Point history</h3>
                  </span>
                  <div className="history">
                    {history.map((value: PointHistory, index: number) => (
                      <div key={`${index}-history-item`}>
                        <span>
                          {value.reason}
                          <div className="sub">{value.date}</div>
                        </span>
                        <span
                          className={`amount ${
                            value.amount >= 0 ? 'positive' : 'negative'
                          }`}
                        >
                          {value.amount >= 0
                            ? `+${value.amount}`
                            : `-${value.amount}`}
                        </span>
                      </div>
                    ))}
                  </div>
                </Card>
              </Backdrop>
            </Card>
          </>
        ) : (
          <h1>Not logged in</h1>
        )}
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
              color="primary"
              onClick={handleRequestPermissions}
              variant="outlined"
            >
              Request permissions
            </Button>
          </Card>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
