import './Announcement.scss';
import type { AnnouncementType } from '../../interfaces';
import Card from '../../components/Card/Card';

interface Props {
  announcement: AnnouncementType;
}

export default function AnnouncementEl({ announcement }: Props) {
  return (
    <Card className="announcement">
      <span className="from">
        <img
          src={announcement.fromPhotoUrl}
          referrerPolicy="no-referrer"
          alt=""
        />
        <div className="from-info">
          <span className="from-name">{announcement.from}</span>
          <span className="timestamp">{announcement.date}</span>
        </div>
      </span>
      <p>
        {announcement.content
          .split('\n')
          .map((line: string, index: number, array: string[]) => (
            <span key={`${index}-announcement-line`}>
              {line}
              {index < array.length - 1 ? <br /> : <></>}
            </span>
          ))}
      </p>
    </Card>
  );
}
