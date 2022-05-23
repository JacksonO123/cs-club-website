import { useLocation } from 'react-router-dom';
import { challenges } from '../Challenges/challengesData';
import './Challenge.scss';
import '../../utils.scss';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { java } from '@codemirror/lang-java';
import {
  Breadcrumbs,
  Link,
  Typography,
  Button,
  Menu,
  MenuItem,
} from '@mui/material';
import { useState } from 'react';

export default function Challenge() {
  const location = useLocation();

  const challengeId: string | undefined =
    location.pathname.match(/challenges\/(\w+)/)?.[1];

  let challenge;
  if (challengeId) challenge = challenges[challengeId];

  const [language, setLanguage] = useState<string>('javascript');
  const [code, setCode] = useState<string>(challenge?.startCode?.[language]);
  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const languageMenuOpen = Boolean(languageMenuAnchorEl);

  const handleLanguageMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    setLanguageMenuAnchorEl(e.currentTarget);
  };
  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchorEl(null);
  };
  return (
    <div className="challenge-wrapper">
      <div className="info-wrapper">
        <Breadcrumbs>
          <Link href="/challenges" underline="hover" color="secondary">
            Challenges
          </Link>
          <Typography>{challenge?.title}</Typography>
        </Breadcrumbs>
        <div className="challenge-header">
          <h1>{challenge?.title}</h1>
        </div>
        <Button
          size="small"
          color="info"
          variant="outlined"
          onClick={handleLanguageMenuOpen}
        >
          {language}
        </Button>
        {challenge?.languages && (
          <Menu
            anchorEl={languageMenuAnchorEl}
            open={languageMenuOpen}
            onClose={handleLanguageMenuClose}
          >
            {challenge.languages.map(
              (language: string, index: number): React.ReactNode => (
                <MenuItem
                  key={`${index}-language-menu-item`}
                  onClick={() => {
                    setLanguage(language);
                    handleLanguageMenuClose();
                  }}
                >
                  {language}
                </MenuItem>
              )
            )}
          </Menu>
        )}
        <div className="challenge-body">{challenge?.description}</div>
      </div>
      <CodeMirror
        height="300px"
        width="100%"
        theme="light"
        value={challenge?.startCode?.[language]}
        extensions={
          language === 'javascript'
            ? [javascript({ jsx: false })]
            : language === 'java'
            ? [java()]
            : []
        }
        onChange={(value: string): void => setCode(value)}
      />
    </div>
  );
}
