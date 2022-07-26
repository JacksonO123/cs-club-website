import { useState, useContext } from "react";
import { addAnnouncement } from "src/firebase";
import { Button, TextField } from "@mui/material";
import { UserContext } from "src/Contexts";
import { styled } from '@mui/material/styles';

import type { AnnouncementType } from "src/interfaces";

import Card from "src/components/card";
import PageTitle from "src/components/page-title";
import Annoucements from ".";

const NewAnnouncementWrapper = styled('div')({
  minWidth: '250px',
  width: '100%',
  maxWidth: '725px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const InputWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '8px',
  width: '100%',
});

const Controls = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '6px'
});

interface Props {
  user: any;
  onSubmit: Function;
  onCancel: Function;
}

const NewAnnouncement = ({ onSubmit, onCancel }: Props) => {
  const user: any = useContext(UserContext);
  const [content, setContent] = useState<string>('');

  const btnStyles = {
    width: 125,
  };

  const formatTime = (time: Date): string => {
    let minutes = time.getMinutes() + '';
    if (minutes.length < 2) {
      minutes = `0${minutes}`;
    }
    let timeString = `${time.getHours()}:${minutes} AM`;
    if (time.getHours() > 12) {
      timeString = `${time.getHours() - 12}:${minutes} PM`;
    }
    return `${timeString} ${new Date().toLocaleDateString()}`;
  };

  const createAnnouncement = async (): Promise<void> => {
    let date = new Date();
    const newAnnouncement: AnnouncementType = {
      from: user.displayName,
      fromPhotoUrl: user.photoURL,
      content: content,
      date: formatTime(date),
      timestamp: date.getTime(),
    };
    addAnnouncement(newAnnouncement);
    onSubmit();
  };

  const handleCancel = (): void => {
    onCancel();
  };

  return (
    <NewAnnouncementWrapper>
      <Card stretch>
        <PageTitle size="small">Create a New Annoucement</PageTitle>
        <InputWrapper>
          <TextField
            label="Content"
            variant="filled"
            fullWidth
            multiline
            rows={3}
            onChange={(e: any): void => setContent(e.target.value)}
            value={content}
          />
          <Controls>
            <Button sx={btnStyles} onClick={handleCancel} color="secondary">
              Cancel
            </Button>
            <Button
              sx={btnStyles}
              onClick={createAnnouncement}
              variant="outlined"
            >
              Post
            </Button>
          </Controls>
        </InputWrapper>
      </Card>
    </NewAnnouncementWrapper>
  );
};

export default NewAnnouncement;
