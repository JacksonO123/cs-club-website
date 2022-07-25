import { styled } from '@mui/material/styles';
import { utils } from 'src/style-utils';

import PageTitle from 'src/components/page-title';

const AboutWrapper = styled('div')({
	padding: utils.contentPadding,
});

const P = styled('p')({
	fontSize: '17px'
});

export default function About() {
	return (
		<AboutWrapper>
			<PageTitle>About</PageTitle>
			<P>
				The MVHS CS Club is a student-run organization that aims to
				provide a welcoming environment for students to learn and
				develop their skills in computer science.
			</P>
			<P>
				We host events throughout the school year such as hackathons,
				app competitions, and more.
			</P>
		</AboutWrapper>
	);
}