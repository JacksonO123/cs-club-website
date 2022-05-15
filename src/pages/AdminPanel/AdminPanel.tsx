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
  approveRequest
} from '../../firebase';

interface Props {
  isAdmin: boolean;
}

export default function AdminPanel({ isAdmin }: Props) {

  const [requests, setRequests] = useState<any[]>([]);

  const requestCardStyle = {
    minWidth: 500,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  }

  const handleGetRequests = async (): Promise<void> => {
    const tempRequests = await getRequests();
    setRequests(tempRequests);
  }

  const handleApproveRequest = (uid: string, index: number): void => {
    approveRequest(uid);
    setRequests(prev => prev.filter((_: any, i: number): boolean => i !== index));
  }

  useEffect(() => {
    handleGetRequests();
  }, []);

  return (
    <div className="admin">
      {
        isAdmin ? (
          <div className="admin-content">
            <h1>Admin Panel</h1>
            <Card sx={requestCardStyle}>
              {
                requests.length > 0 ? (
                  requests.map((request: any, index: number) => {
                    return (
                      <div className="request" key={`${index}-request-index`}>
                        <div className="info">
                          <div className="request-profile row">
                            <Avatar src={request.photoUrl} sx={{width: 32, height: 32}}></Avatar>
                            <h3>{request.name}</h3>
                          </div>
                          <p>{request.email}</p>
                        </div>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleApproveRequest(request.uid, index)}
                        >Approve user</Button>
                      </div>
                    );
                  })
                ) : (
                  <h2>No admin requests</h2>
                )
              }
            </Card>
          </div>
        ) : (
          <h2>Sorry, you do not have the permissions to view this page.</h2>
        )
      }
    </div>
  );
}