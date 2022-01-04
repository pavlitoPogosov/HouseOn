import React from 'react';
import { Link } from 'react-router-dom';

import clsx from 'clsx';

import { NBSP } from '@proscom/ui-utils';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import s from './Activity.module.scss';

export interface ActivityType {
  actorName: string;
  actionName: string;
  entityName: string;
  time: string;
}

export interface ActivityProps {
  activity: ActivityType;

  adaptiveQuery?: string;
  disableBorder?: boolean;
}

export const Activity: React.FC<ActivityProps> = ({
  activity,
  disableBorder,
  adaptiveQuery = '(min-width: 576px)'
}) => {
  const isDesktop = useMediaQuery(adaptiveQuery);

  const { actionName, actorName, entityName, time } = activity;

  return (
    <div
      className={clsx(s.Activity__container, {
        [s.isDesktop]: isDesktop,
        [s.isMobile]: !isDesktop,
        [s.disableBorder]: disableBorder
      })}>
      <div className={s.Activity__iconWrapper}>
        <div className={s.Activity__icon} />
      </div>

      <div className={s.Activity__content}>
        <span className={s.Activity__actorName}>
          {actorName}
          {NBSP}
        </span>

        <span className={s.Activity__actionName}>
          {actionName}
          {NBSP}
        </span>

        <Link className={clsx(s.Activity__entityLink, !isDesktop && s.isMobile)} to="/">
          {entityName}
          {NBSP}
        </Link>

        {time && <div className={s.Activity__time}>{time}</div>}
      </div>
    </div>
  );
};
