import './CustomLink.scss';
import { Link } from 'react-router-dom';

interface Props {
	to: string;
	color?: string;
	children: any;
}

export default function CustomLink({ to, color = 'black', children }: Props) {
	return (
		<Link className="link" to={ to } style={{ color }}>{ children }</Link>
	);
}