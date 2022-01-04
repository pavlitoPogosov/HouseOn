import React from 'react';
import { FormattedMessage } from 'react-intl';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import s from './EventViewPageIntro.module.scss';

export interface IEventViewPageIntroProps {
  title: string;
}

export const EventViewPageIntro: React.FC<IEventViewPageIntroProps> = ({ title }) => {
  const isTablet = useMediaQuery('(min-width: 768px)');
  return (
    <div className={s.EventViewPageIntro__container}>
      <Text
        as="h1"
        className={s.EventViewPageIntro__title}
        text={title}
        variant={isTablet ? TextPropsVariantsEnum.H1 : TextPropsVariantsEnum.H2}
      />

      <p className={s.EventViewPageIntro__description}>
        <FormattedMessage
          defaultMessage="Read the information below and notify the host of your decision"
          id="event.view.description"
        />
      </p>
    </div>
  );
};
