import { useContext, useState } from 'react';
import {
  Button,
  TextField,
} from '@mui/material';
import { updateAnnouncement, deleteAnnouncement } from 'src/firebase';
import { AdminContext } from 'src/Contexts';
import { styled } from '@mui/material/styles';
import { utils } from 'src/style-utils';

import type { AnnouncementType } from 'src/interfaces';

import Card from 'src/components/card';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import Confirm from 'src/components/confirm';

import 'src/utils.scss';

const AnnouncementWrapper = styled('div')({
  width: '100%',
  maxWidth: '750px',
  minWidth: '250px',
  display: 'flex',
  flexDirection: 'column',
  p: {
    margin: 0
  }
});

const Info = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
});

const Controls = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '4px',
});

const From = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  gap: '8px',
  alignItems: 'center',
});

const FromInfo = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const FromName = styled('span')({
  fontSize: '14px',
  fontWeight: 500,
  color: '#3e3e3e'
});

const Timestamp = styled('span')({
  fontSize: '12px',
  fontWeight: 400,
  color: '#8f8f8f'
});

const EditContainer = styled('div')({
  padding: '0 34px'
});

interface Props {
  announcement: AnnouncementType;
}

const Announcement = ({ announcement }: Props) => {
  const isAdmin: boolean | null = useContext(AdminContext);
  const [editing, setEditing] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(announcement.content);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const handleButtonStyle = {
    minWidth: '0',
    padding: '3.25px',
  };

  const handleStartEdit = (): void => {
    setEditing(true);
  };

  const handleSubmitEdit = (): void => {
    setEditing(false);
    console.log(announcement);
    updateAnnouncement(announcement.id, newValue);
  };

  const handleStartDelete = (): void => {
    setConfirmOpen(true);
  };

  const handleDelete = (): void => {
    deleteAnnouncement(announcement.id);
  };

  const imgSx = {
    width: 26,
    height: 26,
    borderRadius: 100
  };

  const cardSx = {
    display: 'flex',
    flexDirection: 'column',
    gap: utils.itemGap
  }

  return (
    <AnnouncementWrapper>
      <Confirm
        onClose={() => setConfirmOpen(false)}
        open={confirmOpen}
        onAccept={handleDelete}
        onReject={() => setConfirmOpen(false)}
      >Are you sure you want to delete this announcement?</Confirm>
      <Card sx={cardSx} stretch>
        <Info>
          <From>
            <img
              src={announcement.fromPhotoUrl}
              alt=""
              style={imgSx}
              referrerPolicy="no-referrer"
            />
            <FromInfo>
              <FromName>{announcement.from}</FromName>
              <Timestamp>{announcement.date}</Timestamp>
            </FromInfo>
          </From>
          {isAdmin && (
            <Controls>
              {editing ? (
                <Button
                  color="success"
                  onClick={handleSubmitEdit}
                  sx={handleButtonStyle}
                >
                  <DoneRoundedIcon />
                </Button>
              ) : (
                <Button
                  color="secondary"
                  sx={handleButtonStyle}
                  onClick={handleStartEdit}
                >
                  <EditRoundedIcon />
                </Button>
              )}
              {!editing && (
                <Button
                  color="error"
                  sx={handleButtonStyle}
                  onClick={handleStartDelete}
                >
                  <DeleteOutlineRoundedIcon />
                </Button>
              )}
            </Controls>
          )}
        </Info>
        <EditContainer>
          {editing ? (
            <TextField
              label="Content"
              variant="filled"
              fullWidth
              multiline
              rows={3}
              onChange={(e: any): void => setNewValue(e.target.value)}
              value={newValue}
            />
          ) : (
            announcement.content
              .split('\n')
              .map((line: string, index: number, array: string[]) => (
                <span key={`announcement-content-${index}`}>
                  {line}
                  {index < array.length - 1 && <br />}
                </span>
              ))
          )}
        </EditContainer>
      </Card>
    </AnnouncementWrapper>
  );
};

export default Announcement;
