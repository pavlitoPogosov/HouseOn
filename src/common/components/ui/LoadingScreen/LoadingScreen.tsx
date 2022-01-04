import React, { useEffect, useState } from 'react';

import { Spinner } from '../Spinner/Spinner';
import { Text, TextPropsVariantsEnum } from '../Text/Text';

import s from './LoadingScreen.module.scss';

export interface LoadingScreenProps {
  disableDelay?: boolean;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ disableDelay }) => {
  const [isContentVisible, setContentVisibility] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout | null = null;

    if (!disableDelay) {
      timeout = setTimeout(() => {
        setContentVisibility(true);
      }, 300);
    }

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isContentVisible) return null;

  return (
    <div className={s.LoadingScreen__container}>
      <Spinner className={s.LoadingScreen__spinner} strokeWidth={7} size="xl" />

      <Text text="Wait a second..." variant={TextPropsVariantsEnum.H3} className={s.LoadingScreen__title} />
    </div>
  );
};
