import { styled } from '@mui/material/styles';
import { utils } from 'src/style-utils';

import PageTitle from 'src/components/page-title';

const ProblemWrapper = styled('div')({
    padding: utils.contentPadding
});

export default function Problems() {
    return (
        <ProblemWrapper>
            <PageTitle>Problems</PageTitle>
        </ProblemWrapper>
    );
}