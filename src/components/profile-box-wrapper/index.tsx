import { styled } from '@mui/material/styles';
import { utils } from 'src/style-utils';

import React from 'react';

interface ProfileBoxWrapperProps {
	children: React.ReactNode;
}

const Wrapper = styled('div')({
	display: 'flex',
	flexDirection: 'column',
	gap: utils.itemGap
});

const ProfileBoxWrapper = ({ children }: ProfileBoxWrapperProps) => {
	return <Wrapper>{children}</Wrapper>
};

export default ProfileBoxWrapper;
