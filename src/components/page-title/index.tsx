import React from 'react';

interface PageTitleProps {
	children: React.ReactNode
	size?: 'small' | 'large' | undefined;
}

const PageTitle = ({ children, size = 'large' }: PageTitleProps) => {
	if (size === 'large' || !size)
		return <h1>{children}</h1>;
	else return <h2>{children}</h2>
};

export default PageTitle;