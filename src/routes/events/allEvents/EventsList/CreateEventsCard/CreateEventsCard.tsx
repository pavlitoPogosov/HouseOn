import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { ReactComponent as PlusIcon } from 'assets/icons/plus.svg';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { CREATE_EVENT_PAGE_ROUTE } from 'utils/routes';

import s from './CreateEventsCard.module.scss';

export interface CreateEventsCardProps {}

export const CreateEventsCard: React.FC<CreateEventsCardProps> = () => {
  return (
    <Link to={CREATE_EVENT_PAGE_ROUTE} className={s.CreateEventsCard__container}>
      <div className={s.CreateEventsCard__iconWrapper}>
        <PlusIcon className={s.CreateEventsCard__plusIcon} />
      </div>

      <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
        <FormattedMessage id="event.card.create" defaultMessage="Create new event" />
      </Text>
    </Link>
  );
};
