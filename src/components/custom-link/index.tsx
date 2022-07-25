import { Link } from 'react-router-dom';

interface Props {
	to: string;
	color?: string;
	children: any;
}

export default function CustomLink({ to, color = 'black', children }: Props) {

	const linkSX = {
		textDecoration: 'none'
	};

	return (
		<Link to={to} style={{ color, ...linkSX }}>{children}</Link>
	);
}