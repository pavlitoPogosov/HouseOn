import React from 'react';

import clsx from 'clsx';
import moment from 'moment';

// eslint-disable-next-line
import { EMDASH } from '@proscom/ui-utils';

import { DividerUnread } from 'routes/chat/ChatMain/_common/DividerUnread/DividerUnread';
import { TChatDataItem } from 'routes/chat/types';

import s from './ChatDialogAction.module.scss';

export interface IChatDialogActionProps {
  chatAction: TChatDataItem;
  containerClassName?: string;
  isTouched: boolean;
  withUnreadDivider?: boolean;
}

export const ChatDialogAction: React.FC<IChatDialogActionProps> = (props) => {
  const { chatAction, containerClassName, isTouched, withUnreadDivider } = props;

  const { author, date, files, id, text, type } = chatAction;

  const actionDate = moment(date).format('dddd, MMMM Do');

  return (
    <>
      {withUnreadDivider && <DividerUnread isTouched={isTouched} />}

      <div className={clsx(s.ChatDialogAction__container, containerClassName)}>
        <div className={s.ChatDialogAction__text}>{`${actionDate} ${EMDASH} ${text}`}</div>
      </div>
    </>
  );
};
