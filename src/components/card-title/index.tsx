import React from 'react';

interface CardTitleProps {
	children: React.ReactNode;
	size?: 'large' | 'small' | undefined;
	sx?: object;
}

const CardTitle = ({ children, size = 'small', sx = {} }: CardTitleProps) => {
	if (size === 'small' || !size)
		return <h4 style={sx}>{children}</h4>
	else return <h3 style={sx}>{children}</h3>;
};

export default CardTitle;
