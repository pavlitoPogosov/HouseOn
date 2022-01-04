import React from 'react';
import { useIntl } from 'react-intl';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './EmptyDialog.module.scss';

export interface EmptyDialogProps {}

export const EmptyDialog: React.FC<EmptyDialogProps> = () => {
  const intl = useIntl();

  return (
    <div className={s.EmptyDialog__container}>
      <div className={s.EmptyDialog__avatar} />

      <Text
        variant={TextPropsVariantsEnum.BODY_M}
        text={intl.formatMessage({
          id: 'chat.dialog.notStarted',
          defaultMessage: 'Chat has not started yet, please be the first to write a message'
        })}
        color="textSecondary"
      />
    </div>
  );
};
