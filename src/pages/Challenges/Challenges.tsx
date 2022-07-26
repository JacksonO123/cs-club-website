import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { challenges } from './challengesData';
import { styled } from '@mui/material/styles';
import { utils } from 'src/style-utils';

import React from 'react';
import CustomLink from 'src/components/link';
import PageTitle from 'src/components/page-title';

const ChallengesWrapper = styled('div')({
  padding: utils.contentPadding,
  display: 'flex',
  flexDirection: 'column',
  gap: utils.itemGap,
});

const ChallengeTitle = styled('div')({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

const Challenges = () => {
  const challengeValues = Object.keys(challenges).map((key) => {
    let obj: any = challenges[key];
    obj.id = key;
    return obj;
  });

  const handleOpenChallenge = (e: any, id: string): void => {
    e.stopPropagation();
    console.log('opening', id);
  };

  return (
    <ChallengesWrapper>
      <PageTitle>
        {challengeValues.length > 0
          ? "Challenges"
          : "No challenges right now, sorry!"
        }
      </PageTitle>
      <div>
        {challengeValues.map(
          (item: any, index: number): React.ReactNode => (
            <Accordion key={`${index}-challenge-list`}>
              <AccordionSummary>
                <ChallengeTitle>
                  {item.title}
                  <CustomLink to={`/challenges/${item.id}`}>
                    <Button
                      color="info"
                      onClick={(e: any): void => handleOpenChallenge(e, item.id)}
                    >
                      Try
                    </Button>
                  </CustomLink>
                </ChallengeTitle>
              </AccordionSummary>
              <AccordionDetails>{item.description}</AccordionDetails>
            </Accordion>
          )
        )}
      </div>
    </ChallengesWrapper>
  );
};

export default Challenges;
