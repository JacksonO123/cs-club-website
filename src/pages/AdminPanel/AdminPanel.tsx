import './AdminPanel.scss';
import '../../utils.scss';
import Card from '../../components/Card/Card';
import { useState, useEffect } from 'react';
import { Avatar, Button, Chip } from '@mui/material';
import { getRequests, approveAdminRequest, getAdminObjs } from '../../firebase';
import type { AdminType } from '../../interfaces';
import ProfileBox from '../../components/ProfileBox/ProfileBox';

interface Props {
  isAdmin: boolean;
}

export default function AdminPanel({ isAdmin }: Props) {
  const [requests, setRequests] = useState<any[]>([]);
  const [admins, setAdmins] = useState<AdminType[]>([]);

  const adminCardStyle = {
    minWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const handleApproveRequest = (
    uid: string,
    name: string,
    email: string,
    photoUrl: string,
    index: number
  ): void => {
    const requestUser: AdminType = {
      uid,
      name,
      email,
      photoUrl,
    };
    approveAdminRequest(requestUser);
    setRequests((prev) =>
      prev.filter((_: any, i: number): boolean => i !== index)
    );
  };

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
      {isAdmin ? (
        <div className="admin-content">
          <h1>Admin Panel</h1>
          <div className="admin-cards">
            <Card sx={adminCardStyle}>
              {requests.length > 0 ? (
                <>
                  <h3>Admin requests</h3>
                  {requests.map((request: any, index: number) => {
                    return (
                      <ProfileBox user={request}>
                        <Button
                          color="success"
                          onClick={() =>
                            handleApproveRequest(
                              request.uid,
                              request.name,
                              request.email,
                              request.photoUrl,
                              index
                            )
                          }
                        >
                          Approve user
                        </Button>
                      </ProfileBox>
                    );
                  })}
                </>
              ) : (
                <h3>No admin requests</h3>
              )}
            </Card>
            <Card sx={adminCardStyle}>
              <h3>Current Admins</h3>
              {admins.length > 0 ? (
                admins.map((admin: AdminType, index: number) => {
                  return <ProfileBox user={admin} />;
                })
              ) : (
                <h2>No admins</h2>
              )}
            </Card>
          </div>
        </div>
      ) : (
        <h2>Sorry, you do not have the permissions to view this page.</h2>
      )}
    </div>
  );
}
