import './Announcement.scss';
import '../../utils.scss';
import type { AnnouncementType } from '../../interfaces';
import Card from '../../components/Card/Card';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import { Button, TextField } from '@mui/material';
import { useState } from 'react';
import { updateAnnouncement, deleteAnnouncement } from '../../firebase';

interface Props {
  announcement: AnnouncementType;
  isAdmin: boolean;
}

export default function AnnouncementEl({ announcement, isAdmin }: Props) {
  const [editing, setEditing] = useState<boolean>(false);
  const [newValue, setNewValue] = useState<string>(announcement.content);
  const handleButtonStyle = {
    minWidth: '0',
    padding: '3.25px',
  };
  const handleStartEdit = () => {
    setEditing(true);
  };
  const handleSubmitEdit = () => {
    setEditing(false);
    console.log(announcement);
    updateAnnouncement(announcement.id, newValue);
  };
  const handleDelete = () => {
    const canDelete = window.confirm(
      'Are you sure you want to delete this announcement?'
    );
    if (canDelete) deleteAnnouncement(announcement.id);
  };
  return (
    <Card className='announcement'>
      <div className='info'>
        <div className='from row'>
          <img
            src={announcement.fromPhotoUrl}
            referrerPolicy='no-referrer'
            alt=''
          />
          <div className='from-info'>
            <span className='from-name'>{announcement.from}</span>
            <span className='timestamp'>{announcement.date}</span>
          </div>
        </div>
        {isAdmin && (
          <div className='controls'>
            {editing ? (
              <Button
                color='success'
                onClick={handleSubmitEdit}
                sx={handleButtonStyle}
              >
                <DoneRoundedIcon />
              </Button>
            ) : (
              <Button
                color='secondary'
                sx={handleButtonStyle}
                onClick={handleStartEdit}
              >
                <EditRoundedIcon />
              </Button>
            )}
            {!editing && (
              <Button
                color='error'
                sx={handleButtonStyle}
                onClick={handleDelete}
              >
                <DeleteOutlineRoundedIcon />
              </Button>
            )}
          </div>
        )}
      </div>
      <div>
        {editing ? (
          <TextField
            label='Content'
            variant='filled'
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
              <span key={`${index}-announcement-line`}>
                {line}
                {index < array.length - 1 ? <br /> : <></>}
              </span>
            ))
        )}
      </div>
    </Card>
  );
}
