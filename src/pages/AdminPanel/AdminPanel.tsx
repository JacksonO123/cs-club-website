import './AdminPanel.scss';
import '../../utils.scss';
import Card from '../../components/Card/Card';
import { useState, useEffect } from 'react';
import {
  Avatar,
  Button
} from '@mui/material';
import {
  getRequests,
  approveAdminRequest,
  getAdminObjs
} from '../../firebase';
import type { AdminType } from '../../interfaces';

interface Props {
  isAdmin: boolean;
}

export default function AdminPanel({ isAdmin }: Props) {

  const [requests, setRequests] = useState<any[]>([]);
  const [admins, setAdmins] = useState<AdminType[]>([]);

  const adminCardStyle = {
    minWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  }

  const handleApproveRequest = (uid: string, name: string, email: string, photoUrl: string, index: number): void => {
    const requestUser: AdminType = {
      uid,
      name,
      email,
      photoUrl
    }
    approveAdminRequest(requestUser);
    setRequests(prev => prev.filter((_: any, i: number): boolean => i !== index));
  }

  useEffect(() => {
    async function handleGetRequests(): Promise<void> {
      const tempRequests = await getRequests();
      setRequests(tempRequests);
    }
    async function handleGetAdmins(): Promise<void> {
      const tempAdmins = await getAdminObjs();
      setAdmins(tempAdmins);
    }
    handleGetRequests();
    handleGetAdmins();
  }, []);

  return (
    <div className="admin">
      {
        isAdmin ? (
          <div className="admin-content">
            <h1>Admin Panel</h1>
            <div className="admin-cards">
              <Card sx={adminCardStyle}>
                {
                  requests.length > 0 ? (
                    requests.map((request: any, index: number) => {
                      return (
                        <div className="profile-box" key={`${index}-request-index`}>
                          <div className="info">
                            <div className="profile row">
                              <img alt="" src={request.photoUrl} style={{borderRadius: 100, width: 32, height: 32}}></img>
                              <h3>{request.name}</h3>
                            </div>
                            <p>{request.email}</p>
                          </div>
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleApproveRequest(request.uid, request.name, request.email, request.photoUrl, index)}
                          >Approve user</Button>
                        </div>
                      );
                    })
                  ) : (
                    <h2>No admin requests</h2>
                  )
                }
              </Card>
              <Card sx={adminCardStyle}>
                <h2>Current Admins</h2>
                {
                  admins.length > 0 ? (
                    admins.map((admin: AdminType, index: number) => {
                      return (
                        <div className="profile-box" key={`${index}-admin-index`}>
                          <div className="info">
                            <div className="profile row">
                              <Avatar src={admin.photoUrl} sx={{width: 32, height: 32}}></Avatar>
                              <h3>{admin.name}</h3>
                            </div>
                            <p>{admin.email}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <h2>No admins</h2>
                  )
                }
              </Card>
             </div>
          </div>
        ) : (
          <h2>Sorry, you do not have the permissions to view this page.</h2>
        )
      }
    </div>
  );
}