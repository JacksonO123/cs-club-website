import './Header.scss';
import mvhsLogo from '../../assets/mvhs-logo.svg';

export default function Header() {
	return (
		<header>
			<div className="top">
				<img src={mvhsLogo}></img>
				<p>MVHS CS Club</p>
			</div>
		</header>
	);
}