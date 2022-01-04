import React from 'react';

import clsx from 'clsx';

import { Activity } from 'common/components/ui/Activity/Activity';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './HistoryBlock.module.scss';

// TODO remove useless data
const ACTIVITIES = [
  {
    date: 'September, 12th, 2021',
    activities: [
      {
        actorName: 'Mikhail Karlov',
        actionName: 'added administrator',
        entityName: 'Maria’s Birthday Party',
        time: 'Just now'
      },
      {
        actorName: 'Mikhail Karlov',
        actionName: 'added administrator',
        entityName: 'My Little Cozy House',
        time: 'Just now'
      }
    ]
  },
  {
    date: 'September, 10th, 2019 year',
    activities: [
      {
        actorName: 'Mikhail Karlov',
        actionName: 'added administrator',
        entityName: 'Maria’s Birthday Party',
        time: 'Just now'
      },
      {
        actorName: 'Mikhail Karlov',
        actionName: 'added administrator',
        entityName: 'My Little Cozy House',
        time: 'Just now'
      }
    ]
  },
  {
    date: 'September, 8th, 2019 year',
    activities: [
      {
        actorName: 'Mikhail Karlov',
        actionName: 'added administrator',
        entityName: 'Maria’s Birthday Party',
        time: 'Just now'
      }
    ]
  }
];

export interface HistoryBlockProps {
  containerClassName?: string;
  disableActivityBorder?: boolean;
}

export const HistoryBlock: React.FC<HistoryBlockProps> = ({ containerClassName, disableActivityBorder }) => {
  // TODO add real data through props
  return (
    <div className={clsx(containerClassName)}>
      {ACTIVITIES.map((block) => (
        <div key={block.date} className={s.HistoryBlock__section}>
          <div className={s.HistoryBlock__title}>
            <Text variant={TextPropsVariantsEnum.CAPTION_M} text={block.date} color="textSecondary" />

            <div className={s.HistoryBlock__titleLine} />
          </div>

          {block.activities.map((activity, i) => (
            <Activity
              key={i}
              activity={activity}
              disableBorder={
                typeof disableActivityBorder === 'undefined' ? i === block.activities.length - 1 : disableActivityBorder
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};
