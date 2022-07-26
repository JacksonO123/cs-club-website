import { styled } from '@mui/material/styles';
import { utils } from 'src/style-utils';

import PageTitle from 'src/components/page-title';

const PageWrapper = styled('div')({
  padding: utils.contentPadding
});

const The404Page = () => {
  return (
    <PageWrapper>
      <PageTitle>404 page not found</PageTitle>
    </PageWrapper>
  );
};

export default The404Page;
