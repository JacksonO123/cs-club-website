import { styled } from '@mui/material/styles';

import React from 'react';

const SubWrapper = styled('div')({
	color: '#868e96',
	fontSize: 'smaller'
});

interface SubProps {
	children: React.ReactNode;
}

const Sub = ({ children }: SubProps) => {
	return <SubWrapper>{children}</SubWrapper>
};

export default Sub;
