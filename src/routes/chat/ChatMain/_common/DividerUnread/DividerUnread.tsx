import React from 'react';
import { useIntl } from 'react-intl';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './DividerUnread.module.scss';

type TDividerUnread = {
  isTouched: boolean;
};

export const DividerUnread: React.FC<TDividerUnread> = (props) => {
  const { isTouched } = props;

  const intl = useIntl();

  return isTouched ? null : (
    <div className={s.DividerUnread__container}>
      <Text
        className={s.DividerUnread__divider_text}
        text={intl.formatMessage({
          defaultMessage: 'New',
          id: 'chat.main.divider.unread.text'
        })}
        variant={TextPropsVariantsEnum.CAPTION_M}
      />
    </div>
  );
};
