import React from 'react';

import { ButtonLink } from 'common/components/ui/Button/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { CREATE_EVENT_PAGE_ROUTE } from 'utils/routes';

import s from './EmptyWarning.module.scss';

export const EmptyEventsWarning: React.FC<unknown> = () => {
  return (
    <div className={s.EmptyWarning__container}>
      <div className={s.EmptyWarning__icon} />

      <Text className={s.EmptyWarning__text} variant={TextPropsVariantsEnum.BODY_M}>
        This is your calendar. Plan projects, task and events.
        <br />
        Also you can track team schedule right on this page
      </Text>

      <ButtonLink className={s.EmptyWarning__link} color="green" to={CREATE_EVENT_PAGE_ROUTE} variant="secondary">
        Add event
      </ButtonLink>
    </div>
  );
};
