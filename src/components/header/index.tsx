import { styled } from '@mui/material/styles';
import { utils } from 'src/style-utils';
import { Avatar } from '@mui/material';

import mvhsLogo from 'src/assets/mvhs-logo.svg';

const logoSize: string = '24px';

const HeaderWrapper = styled('header')({
	display: 'flex',
	flexDirection: 'row',
	padding: '19px 24px',
	background: utils.yellow,
	boxShadow: '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)',
	zIndex: 5,
	height: utils.headerHeight,
	gap: '16px',
	alignItems: 'center'
});

const HeaderTitle = styled('p')({
	margin: 0,
	padding: 0,
	fontSize: '22px',
	fontWeight: 400
});

export default function Header() {
	return (
		<HeaderWrapper>
			<Avatar
				src={mvhsLogo}
				alt=""
				sx={{
					height: logoSize,
					width: 'auto',
					borderRadius: 0
				}}
			/>
			<HeaderTitle>MVHS CS Club</HeaderTitle>
		</HeaderWrapper>
	);
}