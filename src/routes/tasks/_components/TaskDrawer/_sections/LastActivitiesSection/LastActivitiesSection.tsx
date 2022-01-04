import React from 'react';
import { useIntl } from 'react-intl';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { TaskActivitiesDialog } from 'common/components/ui/_dialogs/TaskActivitiesDialog/TaskActivitiesDialog';
import { Activity } from 'common/components/ui/Activity/Activity';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { SectionWrapper } from '../SectionWrapper/SectionWrapper';

import s from './LastActivitiesSection.module.scss';

// TODO remove useless data
const ACTIVITIES = [
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
  },
  {
    actorName: 'Mikhail Karlov',
    actionName: 'added administrator',
    entityName: 'My Little Cozy House',
    time: 'Just now'
  }
];

export interface LastActivitiesSectionProps {}

export const LastActivitiesSection: React.FC<LastActivitiesSectionProps> = () => {
  const activitiesDialogToggler = useToggle();

  const intl = useIntl();

  return (
    <SectionWrapper title={intl.formatMessage({ id: 'tasks.lastActivities.title', defaultMessage: 'Last activities' })}>
      {ACTIVITIES.length ? (
        <>
          {ACTIVITIES.map((activity, i) => (
            <Activity key={i} disableBorder={i === ACTIVITIES.length - 1} activity={activity} />
          ))}

          <NavigationLink
            as="div"
            isUnderline
            text={intl.formatMessage({ id: 'tasks.lastActivities.viewAll', defaultMessage: 'View all' })}
            icon={<EyeIcon />}
            onClick={activitiesDialogToggler.set}
          />
        </>
      ) : (
        <Text
          text={intl.formatMessage({ id: 'tasks.lastActivities.empty', defaultMessage: 'No activities yet' })}
          variant={TextPropsVariantsEnum.BODY_M}
          className={s.LastActivitiesSection__emptyMessage}
          color="textSecondary"
        />
      )}

      <TaskActivitiesDialog
        isOpen={activitiesDialogToggler.value}
        onClose={activitiesDialogToggler.unset}
        dialogProps={{
          blackoutClassName: s.LastActivitiesSection__blackout,
          disableOverflowControl: true
        }}
      />
    </SectionWrapper>
  );
};
