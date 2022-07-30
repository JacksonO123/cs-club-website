import { useState, useEffect, useContext } from 'react';
import { Button } from '@mui/material';
import {
  getRequests,
  approveAdminRequest,
  getAdminObjs,
  rejectAdminRequest
} from 'src/firebase';
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
import FadeIn from 'src/components/keyframes/fade-in';
import ExpandDown from 'src/components/keyframes/expand-down';
import Confirm from 'src/components/confirm';

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

interface CurrentRequest {
  request: AdminType;
  index: number;
}

const AdminPanel = () => {
  const isAdmin = useContext(AdminContext);
  const [requests, setRequests] = useState<AdminType[]>([]);
  const [admins, setAdmins] = useState<AdminType[]>([]);
  const [rejectConfirmOpen, setRejectConfirmOpen] = useState<boolean>(false);
  const [currentRequest, setCurrentRequest] = useState<CurrentRequest | null>(null);

  const adminCardStyle = {
    minWidth: 400,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  };

  const removeRequestIndex = (index: number): void => {
    setRequests((prev) =>
      prev.filter((_: any, i: number): boolean => i !== index)
    );
  };

  const handleApproveRequest = (request: AdminType, index: number): void => {
    const requestUser: AdminType = { ...request };
    approveAdminRequest(requestUser);
    removeRequestIndex(index);
  };

  const handleRejectRequest = (): void => {
    if (currentRequest !== null) {
      rejectAdminRequest(currentRequest.request.uid);
      removeRequestIndex(currentRequest.index);
    }
    setRejectConfirmOpen(false);
  };

  const handleStartRejectRequest = (request: AdminType, index: number): void => {
    setCurrentRequest({
      request,
      index
    });
    setRejectConfirmOpen(true);
  };

  const handleStopRejectRequest = (): void => {
    setCurrentRequest(null);
    setRejectConfirmOpen(false);
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
          ? <PageTitle>Sorry, you do not have the permissions to view this page.</PageTitle>
          : isAdmin === true
          && (
            <AdminContent>
              <PageTitle>Admin Panel</PageTitle>
              <FadeIn>
                <AdminCards>
                  <Card sx={adminCardStyle}>
                    <CardTitle size="large">Admin requests</CardTitle>
                    {requests.length > 0 ? (
                      <ExpandDown>
                        <ProfileBoxWrapper>
                          {requests.map((request: AdminType, index: number) => (
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
                                onClick={() => handleStartRejectRequest(request, index)}
                              >Reject</Button>
                            </ProfileBox>
                          ))}
                        </ProfileBoxWrapper>
                      </ExpandDown>
                    ) : (
                      <CardTitle size="small">No admin requests</CardTitle>
                    )}
                    <Confirm
                      open={rejectConfirmOpen}
                      onClose={handleStopRejectRequest}
                      onReject={handleStopRejectRequest}
                      onAccept={handleRejectRequest}
                    >Are you sure you want to reject this request?</Confirm>
                  </Card>
                  <Card sx={adminCardStyle}>
                    <CardTitle size="large">Current Admins</CardTitle>
                    <ExpandDown>
                      {admins.length > 0 ? (
                        <ProfileBoxWrapper>
                          {admins.map((admin: AdminType) => {
                            return (
                              <ProfileBox
                                user={admin}
                                key={v4()}
                              />
                            );
                          })}
                        </ProfileBoxWrapper>
                      ) : (
                        <CardTitle size="small">No admins</CardTitle>
                      )}
                    </ExpandDown>
                  </Card>
                </AdminCards>
              </FadeIn>
            </AdminContent>
          )}
    </AdminWrapper>
  );
};

export default AdminPanel;
