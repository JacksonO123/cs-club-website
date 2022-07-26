import { styled } from '@mui/material/styles';
import { classes } from 'src/style-utils';

import React from 'react';

const Wrapper = styled('div')({
	...classes.full,
	...classes.center
});

interface Props {
	children: React.ReactNode;
}

const FullCenter = ({ children }: Props) => {
	return <Wrapper>{children}</Wrapper>
};

export default FullCenter;
