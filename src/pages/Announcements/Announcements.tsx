import { getAnnouncements, db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect, useContext } from 'react';
import { Fab } from '@mui/material';
import { AdminContext, UserContext } from '../../Contexts';
import { v4 } from 'uuid';

import NewAnnouncement from './NewAnnouncement';
import AddIcon from '@mui/icons-material/Add';
import Announcement from './Announcement';

import './Announcements.scss';

export default function Annoucements() {

  const user: any = useContext(UserContext);
  const isAdmin: boolean = useContext(AdminContext);

  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [announcementResponse, setAnnouncementResponse] = useState<boolean>(false);
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
      setAnnouncements(tempAnnouncements);
      setAnnouncementResponse(true);
    })();
    onSnapshot(collection(db, 'announcements'), (snapshot: any) => {
      const docs = snapshot.docs.map((doc: any) => doc.data());
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
      {announcementResponse
        ? (
          announcements.length > 0
            ? (
              <>
                <h1>Announcements</h1>
                <div className="announcement-list">
                  {announcements
                    .sort((a: any, b: any) => b.timestamp - a.timestamp)
                    .map((announcement: any): React.ReactNode => (
                      <Announcement
                        key={v4()}
                        announcement={announcement}
                        isAdmin={isAdmin}
                      />
                    ))}
                </div>
              </>
            ) : (
              <h1>No announcements yet</h1>
            )
        ) : (
          <h1>Loading announcements...</h1>
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
