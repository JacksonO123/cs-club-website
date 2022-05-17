import React from 'react';
import './ProfileBox.scss';

interface Props {
  user: any;
  children?: React.ReactNode[] | React.ReactNode; // for the content on the
  // right of the data
}

export default function ProfileBox({ user, children }: Props) {
  return (
    <div className="profile-box">
      <div className="info">
        <div className="profile">
          <img
            alt=""
            src={user.photoUrl}
            style={{
              borderRadius: 100,
              width: 32,
              height: 32,
            }}
          ></img>
          <div className="profile-text">
            <span>{user.name}</span>
            <div className="sub email" title={user.email}>
              {user.email}
            </div>
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
