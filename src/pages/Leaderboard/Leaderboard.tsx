import { useEffect, useState } from 'react';
import { getLeaderboard } from '../../firebase';
import './Leaderboard.scss';
import type { PointHistory, UserType } from '../../interfaces';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Card from '../../components/Card/Card';

export default function Leaderboard() {
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

  return (
    <div className="leaderboard-page">
      <h1>Leaderboard </h1>
      <Card className="leaderboard" onScroll={handleScroll}>
        <div
          className={`leaderboard-header ${leaderbaordScroll > 0 ? 'shadow' : ''
            }`}
        >
          <div className="sub">Name</div>
          <div className="sub">Points</div>
        </div>
        <div className="leaderboard-content">
          {leaderboard.length > 0 ? (
            leaderboard
              .sort(
                (a: any, b: any) =>
                  getPointsFromHistory(b.history) -
                  getPointsFromHistory(a.history)
              )
              .map((data: any, i: number) => (
                <div key={`${i}-leaderbaord-item`} className="leaderboard-item">
                  {i === 0 ? (
                    <div className="absolute-place-wrapper">
                      <EmojiEventsIcon sx={{ color: goldColor }} />
                      <span>1</span>
                    </div>
                  ) : i === 1 ? (
                    <div className="absolute-place-wrapper">
                      <EmojiEventsIcon sx={{ color: silverColor }} />
                      <span>2</span>
                    </div>
                  ) : i === 2 ? (
                    <div className="absolute-place-wrapper">
                      <EmojiEventsIcon sx={{ color: bronzeColor }} />
                      <span>3</span>
                    </div>
                  ) : (
                    <div className="place-wrapper">{i + 1}</div>
                  )}
                  <span className="data-wrapper">
                    <span>{data.name}</span>
                    <span>{getPointsFromHistory(data.history)}</span>
                  </span>
                </div>
              ))
          ) : (
            <></>
          )}
        </div>
      </Card>
    </div>
  );
}
