import { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import { getRequests, approveAdminRequest, getAdminObjs } from 'src/firebase';
import { AdminContext } from 'src/Contexts';
import { v4 } from 'uuid';
import { styled } from '@mui/material/styles';
import { utils } from 'src/style-utils';

import type { AdminType } from 'src/interfaces';

import ProfileBox from 'src/components/profile-box';
import Card from 'src/components/card';
import CardTitle from 'src/components/card-title';
import PageTitle from 'src/components/page-title';
import ProfileBoxWrapper from 'src/components/profile-box-wrapper';
import FullCenter from 'src/components/full-center';

import 'src/utils.scss';

const AdminWrapper = styled('div')({
  padding: utils.contentPadding,
});

const AdminContent = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
});

const AdminCards = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  gap: utils.cardPadding
});

const AdminPanel = () => {
  const isAdmin = useContext(AdminContext);
  const [requests, setRequests] = useState<AdminType[]>([]);
  const [admins, setAdmins] = useState<AdminType[]>([]);

  const adminCardStyle = {
    minWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const handleApproveRequest = (request: AdminType, index: number): void => {
    const requestUser: AdminType = { ...request };
    approveAdminRequest(requestUser);
    setRequests((prev) =>
      prev.filter((_: any, i: number): boolean => i !== index)
    );
  };

  const handleRejectRequest = (request: AdminType, index: number): void => {
  };

  useEffect(() => {
    async function handleGetRequests(): Promise<void> {
      const tempRequests: AdminType[] = await getRequests();
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
    <AdminWrapper>
      {isAdmin === null
        ? <PageTitle>Loading...</PageTitle>
        : isAdmin === false
          ? (
            <FullCenter>
              <PageTitle>Sorry, you do not have the permissions to view this page.</PageTitle>
            </FullCenter>
          ) : isAdmin === true
          && (
            <AdminContent>
              <PageTitle>Admin Panel</PageTitle>
              <AdminCards>
                <Card sx={adminCardStyle}>
                  <CardTitle size="large">Admin requests</CardTitle>
                  {requests.length > 0 ? (
                    requests.map((request: AdminType, index: number) => (
                      <ProfileBox
                        user={request}
                        key={v4()}
                      >
                        <Button
                          color="success"
                          onClick={() =>
                            handleApproveRequest(
                              request,
                              index
                            )
                          }
                        >Approve</Button>
                        <Button
                          color="error"
                          onClick={() => handleRejectRequest(request, index)}
                        >Reject</Button>
                      </ProfileBox>
                    ))
                  ) : (
                    <CardTitle size="small">No admin requests</CardTitle>
                  )}
                </Card>
                <Card sx={adminCardStyle}>
                  <CardTitle size="large">Current Admins</CardTitle>
                  <ProfileBoxWrapper>
                    {admins.length > 0 ? (
                      admins.map((admin: AdminType) => {
                        return (
                          <ProfileBox
                            user={admin}
                            key={v4()}
                          />
                        );
                      })
                    ) : (
                      <CardTitle size="small">No admins</CardTitle>
                    )}
                  </ProfileBoxWrapper>
                </Card>
              </AdminCards>
            </AdminContent>
          )}
    </AdminWrapper>
  );
}

export default AdminPanel;
