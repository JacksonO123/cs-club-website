import './Header.scss';
import mvhsLogo from '../../assets/mvhs-logo.svg';

export default function Header() {
	return (
		<header>
			<div>
				<img src={mvhsLogo} alt=""></img>
				<p>MVHS CS Club</p>
			</div>
		</header>
	);
}