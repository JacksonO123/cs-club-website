import React, { useRef, useState, useEffect } from 'react';

interface Props {
	children: React.ReactNode;
	length: number;
	callback: () => void;
	sx: object;
	wrapperSx: object;
}

const defaultProps = {
	length: 0.5,
	sx: {},
	wrapperSx: {}
};

const ExpandUp = ({ children, length, callback, sx, wrapperSx }: Props) => {
	const wrapperRef = useRef<HTMLDivElement | null>(null);
	const [height, setHeight] = useState<string>('auto');

	useEffect(() => {
		if (wrapperRef.current !== null) {
			const rect = wrapperRef.current.getBoundingClientRect();
			setHeight(`${rect.height}px`);
		}
	}, [wrapperRef]);

	useEffect(() => {
		if (height !== 'auto') {
			console.log(height);
			setHeight(`${0}px`);
			setTimeout(() => {
				callback();
			}, 1000 * length);
		}
	}, [height]);

	const localWrapperSx = {
		transition: `${length}s`,
		overflow: 'hidden',
		height,
		...wrapperSx
	};

	return (
		<div style={localWrapperSx}>
			<div style={sx} ref={wrapperRef}>{children}</div>
		</div>
	);
};

ExpandUp.defaultProps = defaultProps;

export default ExpandUp;
