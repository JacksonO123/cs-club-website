import React, { useEffect, useState } from 'react'

interface Props {
	children: React.ReactNode;
	length: number;
	sx: object;
}

const defaultProps = {
	length: 0.5,
	sx: {}
};

type fadeInProps = Props & typeof defaultProps;

const FadeIn = ({ children, length, sx }: fadeInProps) => {
	const [opacity, setOpacity] = useState<number>(0);

	const localSx = {
		...sx,
		transition: `${length}s ease-in-out`,
		opacity
	};

	useEffect(() => {
		setOpacity(1);
	}, []);

	return <div style={localSx}>{children}</div>
};

FadeIn.defaultProps = defaultProps;

export default FadeIn;
