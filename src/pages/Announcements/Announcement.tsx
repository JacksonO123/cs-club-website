import './Announcement.scss';
import type { AnnouncementType } from '../../interfaces';
import Card from '../../components/Card/Card';
import { useEffect, useState } from 'react';

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
        />
        <span className="from-name">{announcement.from}</span>
        <span className="timestamp">{announcement.timestamp}</span>
      </span>
      <p>{announcement.content}</p>
    </Card>
  );
}