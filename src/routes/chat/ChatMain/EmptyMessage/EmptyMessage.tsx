import React from 'react';
import { useIntl } from 'react-intl';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './EmptyMessage.module.scss';

export const EmptyMessage: React.FC<unknown> = () => {
  const intl = useIntl();

  return (
    <div className={s.EmptyMessage__container}>
      <div className={s.EmptyMessage__avatar} />

      <Text
        className={s.EmptyMessage__text}
        color="textSecondary"
        text={intl.formatMessage({
          defaultMessage: 'Choose a group of people from the list on the left',
          id: 'chat.chooseGroupOfPeople'
        })}
        variant={TextPropsVariantsEnum.BODY_M}
      />
    </div>
  );
};
