import React from 'react';

interface PageTitleProps {
	children: React.ReactNode
	size?: 'small' | 'large' | undefined;
	sx?: object;
}

const defaultProps = {
	sx: {},
	size: 'large'
};

const PageTitle = ({ children, size, sx }: PageTitleProps) => {
	if (size === 'large' || !size)
		return <h1 style={sx}>{children}</h1>;
	else return <h2 style={sx}>{children}</h2>
};

PageTitle.defaultProps = defaultProps;

export default PageTitle;
