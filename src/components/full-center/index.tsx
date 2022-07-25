import { styled } from '@mui/material/styles';

import React from 'react';

const Wrapper = styled('div')({
	height: '100%',
	width: '100%',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	alignContent: 'center'
})

interface Props {
	children: React.ReactNode;
}

const FullCenter = ({ children }: Props) => {
	return <Wrapper>{children}</Wrapper>
}

export default FullCenter;
