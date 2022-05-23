import React from 'react';
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import './Challenges.scss';
import { challenges } from './challengesData';
import CustomLink from '../../components/CustomLink/CustomLink';

export default function Challenges() {
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
    <div className="challenges-wrapper">
      {challengeValues.map(
        (item: any, index: number): React.ReactNode => (
          <Accordion key={`${index}-challenge-list`}>
            <AccordionSummary>
              <div className="challenge-title">
                <span>{item.title}</span>
                <CustomLink to={`/challenges/${item.id}`}>
                  <Button
                    color="info"
                    onClick={(e: any): void => handleOpenChallenge(e, item.id)}
                  >
                    Try
                  </Button>
                </CustomLink>
              </div>
            </AccordionSummary>
            <AccordionDetails>{item.description}</AccordionDetails>
          </Accordion>
        )
      )}
    </div>
  );
}
