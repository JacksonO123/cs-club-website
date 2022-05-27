import './Announcements.scss';
import { getAnnouncements, db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import { useState, useEffect } from 'react';
import NewAnnouncement from './NewAnnouncement';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Announcement from './Announcement';

interface Props {
  user: any;
  isAdmin: boolean;
}

export default function Annoucements({ user, isAdmin }: Props) {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [addingAnnouncement, setAddingAnnouncement] = useState<boolean>(false);

  const fabStyles = {
    position: 'absolute',
    bottom: 30,
    right: 30,
  };

  const handleAddingAnnouncement = (): void => {
    setAddingAnnouncement(true);
  };

  const handleCancelAddingAnnouncement = (): void => {
    setAddingAnnouncement(false);
  };

  useEffect(() => {
    (async (): Promise<void> => {
      const tempAnnouncements = await getAnnouncements();
      console.log(tempAnnouncements);
      setAnnouncements(tempAnnouncements);
    })();
    onSnapshot(collection(db, 'announcements'), (snapshot: any) => {
      const docs = snapshot.docs.map((doc: any) => doc.data());
      console.log(docs);
      setAnnouncements(docs);
    });
  }, []);

  return (
    <div className="announcements">
      {addingAnnouncement ? (
        <NewAnnouncement
          user={user}
          onSubmit={handleCancelAddingAnnouncement}
          onCancel={handleCancelAddingAnnouncement}
        />
      ) : (
        <></>
      )}
      {announcements.length > 0 ? (
        <>
          <h1>Announcements</h1>
          <div className="announcement-list">
            {announcements
              .sort((a: any, b: any) => b.timestamp - a.timestamp)
              .map((announcement: any, index: number): any => (
                <Announcement
                  key={`${index}-announcement-id`}
                  announcement={announcement}
                  isAdmin={isAdmin}
                />
              ))}
          </div>
        </>
      ) : (
        <h1>No announcements yet</h1>
      )}
      {isAdmin ? (
        <Fab sx={fabStyles} color="primary" onClick={handleAddingAnnouncement}>
          <AddIcon />
        </Fab>
      ) : (
        <></>
      )}
    </div>
  );
}
