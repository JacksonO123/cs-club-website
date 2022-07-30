import { utils } from 'src/style-utils';
import {
	Button
} from '@mui/material';
import { keyframes } from 'styled-components';
import { useEffect, useState } from 'react';

import styled from 'styled-components';
import Card from 'src/components/card';
import FadeIn from '../keyframes/fade-in';
import FadeOut from '../keyframes/fade-out'
import CardTitle from '../card-title';

const blurAmount: number = 4;
const animationTime: number = 0.4;

const rippleIn = keyframes`
	from {
		width: 0vw;
		height: 0vh;
		opacity: 0;
	}
	to {
		width: 300vw;
		height: 300vh;
		opacity: 1;
	}
`;

const rippleOut = keyframes`
	from {
		width: 300vw;
		height: 300vh;
		opacity: 1;
	}
	to {
		width: 0vw;
		height: 0vh;
		opacity: 0;
	}
`;

const animateDown1 = keyframes`
	from {
		transform: translateY(-100%);
	}
	to {
		transform: translateY(0%);
	}
`;

const animateDown2 = keyframes`
	from {
		transform: translateY(0%);
	}
	to {
		transform: translateY(100%);
	}
`;

interface ConfirmState {
	open: boolean;
}

const ConfirmBackground = styled.div`
	position: absolute;
	${(props: ConfirmState): string => (
		props.open
			? `
				top: 0;
				left: 0;
			`
			: `
				top: 100%;
				left: 100%;
			`
	)}
	z-index: 1500;
	transition: 0.25s;
	background: rgba(70, 70, 70, 0.2);
	backdrop-filter: blur(${blurAmount}px);
	width: 300vw;
	height: 300vh;
	transform: translate(-50%, -50%);
	border-radius: 100%;
	animation: ${(props: ConfirmState) => props.open ? rippleIn : rippleOut} ${animationTime}s ease-in;
`;

const ConfirmContent = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 2000;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const Column = styled.div`
	display: flex;
	flex-direction: column;
	gap: ${utils.itemGap};
`;

const Controls = styled.div`
	width: 100%;
	display: flex;
	justify-content: flex-end;
	gap: ${utils.itemGap}
`;

const AnimateDown = styled.div`
	animation: ${(props: ConfirmState) => props.open ? animateDown1 : animateDown2} ${animationTime}s ease-in-out;
	transform: translateY(0%);
`;

interface ConfirmProps {
	onClose: () => void;
	open: boolean;
	children: string;
	onAccept: () => void;
	onReject: () => void;
}

const Confirm = ({ onClose, open, children, onAccept, onReject }: ConfirmProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(open);

	const absPos = {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		zIndex: 2000
	};

	useEffect(() => {
		open && setIsOpen(true);
		if (!open) {
			setTimeout(() => {
				setIsOpen(false);
			}, 1000 * animationTime);
		}
	}, [open]);

	const ConfirmContentEl = (): React.ReactElement => (
		<ConfirmContent onClick={onClose}>
			<AnimateDown open={open}>
				<Card onClick={(e: any): void => e.stopPropagation()}>
					<Column>
						<CardTitle sx={{ fontWeight: 400, fontSize: 18 }}>{children}</CardTitle>
						<Controls>
							<Button
								color="error"
								variant="text"
								onClick={onReject}
							>No</Button>
							<Button
								color="success"
								variant="outlined"
								onClick={onAccept}
							>Yes</Button>
						</Controls>
					</Column>
				</Card>
			</AnimateDown>
		</ConfirmContent>
	);

	return (
		isOpen ? (
			<>
				<ConfirmBackground open={open} />
				{open
					? (
						<FadeIn sx={absPos}>
							<ConfirmContentEl />
						</FadeIn>
					)
					: (
						<FadeOut sx={absPos}>
							<ConfirmContentEl />
						</FadeOut>
					)
				}
			</>
		) : <></>
	);
};

export default Confirm;
