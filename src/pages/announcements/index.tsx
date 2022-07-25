import { getAnnouncements, db } from 'src/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect, useContext } from 'react';
import { Fab } from '@mui/material';
import { AdminContext, UserContext } from 'src/Contexts';
import { v4 } from 'uuid';
import { styled } from '@mui/material/styles';
import { utils } from 'src/style-utils';

import NewAnnouncement from './NewAnnouncement';
import AddIcon from '@mui/icons-material/Add';
import Announcement from './Announcement';
import PageTitle from 'src/components/page-title';
import { AnnouncementType } from 'src/interfaces';

const AnnouncementsWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  alignItems: 'center',
  overflowY: 'scroll',
  padding: utils.contentPadding,
  gap: utils.cardPadding,
});

const AnnouncementList = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '50px',
  width: '100%'
});

export default function Annoucements() {

  const user: any = useContext(UserContext);
  const isAdmin: boolean | null = useContext(AdminContext);

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
    <AnnouncementsWrapper>
      {addingAnnouncement && (
        <NewAnnouncement
          user={user}
          onSubmit={handleCancelAddingAnnouncement}
          onCancel={handleCancelAddingAnnouncement}
        />
      )}
      {announcementResponse
        ? (
          announcements.length > 0
            ? (
              <>
                <PageTitle>Announcements</PageTitle>
                <AnnouncementList>
                  {announcements
                    .sort((a: AnnouncementType, b: AnnouncementType) => b.timestamp - a.timestamp)
                    .map((announcement: AnnouncementType): React.ReactNode => (
                      <Announcement
                        key={v4()}
                        announcement={announcement}
                      />
                    ))}
                </AnnouncementList>
              </>
            ) : (
              <PageTitle>No announcements yet</PageTitle>
            )
        ) : (
          <PageTitle>Loading announcements...</PageTitle>
        )}
      {isAdmin ? (
        <Fab sx={fabStyles} color="primary" onClick={handleAddingAnnouncement}>
          <AddIcon />
        </Fab>
      ) : (
        <></>
      )}
    </AnnouncementsWrapper>
  );
}
