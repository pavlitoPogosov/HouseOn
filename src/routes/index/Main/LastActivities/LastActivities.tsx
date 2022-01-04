import React from 'react';

import { Activity } from 'common/components/ui/Activity/Activity';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { ViewAllLink } from 'routes/index/_common/ViewAllLink/ViewAllLink';

import s from './LastActivities.module.scss';

export interface LastActivitiesProps {}

// TODO when api will be ready - make global enums in order to apply only known values
const TEST_ACTIVITIES = [
  {
    actorName: 'Mikhail Karlov',
    actionName: 'added administrator',
    entityName: 'Danil Antonov',
    time: 'Just now'
  },
  {
    actorName: 'Mikhail Karlov',
    actionName: 'added administrator',
    entityName: 'Danil Antonov',
    time: 'Just now'
  },
  {
    actorName: 'Mikhail Karlov',
    actionName: 'added administrator',
    entityName: 'Danil Antonov',
    time: 'Just now'
  },
  {
    actorName: 'Mikhail Karlov',
    actionName: 'added administrator',
    entityName: 'Danil Antonov',
    time: 'Just now'
  },
  {
    actorName: 'Mikhail Karlov',
    actionName: 'added administrator',
    entityName: 'Danil Antonov',
    time: 'Just now'
  },
  {
    actorName: 'Mikhail Karlov',
    actionName: 'added administrator',
    entityName: 'Danil Antonov',
    time: 'Just now'
  },
  {
    actorName: 'Mikhail Karlov',
    actionName: 'added administrator',
    entityName: 'Danil Antonov',
    time: 'Just now'
  }
];

export const LastActivities: React.FC<LastActivitiesProps> = () => {
  return (
    <div className={s.LastActivities__container}>
      <div className={s.LastActivities__header}>
        <Text variant={TextPropsVariantsEnum.H3} as="h4" text="Last activity" className={s.LastActivities__title} />

        <ViewAllLink to="/" />
      </div>

      <div className={s.LastActivities__content}>
        {TEST_ACTIVITIES.map((activity, i) => (
          <Activity key={i} disableBorder={i === TEST_ACTIVITIES.length - 1} activity={activity} />
        ))}
      </div>
    </div>
  );
};
