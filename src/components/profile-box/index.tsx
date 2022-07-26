import { AdminType } from '../../interfaces';
import { Typography, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
import { utils } from 'src/style-utils';

import React from 'react';
import Sub from '../sub';

const userPhotoSize: string = '32px';

const ProfileBoxWrapper = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderRadius: '6px',
  gap: utils.itemGap,
});

const Info = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

const Profile = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
});

const ProfileText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
});

const Email = styled('div')({
  maxWidth: '140px',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
});

interface Props {
  user: AdminType
  children?: React.ReactNode[] | React.ReactNode;
}

const ProfileBox = ({ user, children }: Props) => {

  return (
    <ProfileBoxWrapper>
      <Info>
        <Profile>
          <img
            src={user.photoUrl}
            alt=""
            style={{
              width: userPhotoSize,
              height: userPhotoSize,
              borderRadius: 100
            }}
            referrerPolicy="no-referrer"
          />
          <ProfileText>
            <Typography variant="body2" sx={{ fontWeight: 400 }}>{user.name}</Typography>
            <Sub>
              <Email title={user.email}>
                {user.email}
              </Email>
            </Sub>
          </ProfileText>
        </Profile>
      </Info>
      {children}
    </ProfileBoxWrapper>
  );
};

export default ProfileBox;
