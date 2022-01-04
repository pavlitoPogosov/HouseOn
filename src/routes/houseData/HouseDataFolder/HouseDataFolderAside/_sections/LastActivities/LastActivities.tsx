import React from 'react';
import { useIntl } from 'react-intl';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { TaskActivitiesDialog } from 'common/components/ui/_dialogs/TaskActivitiesDialog/TaskActivitiesDialog';
import { Activity } from 'common/components/ui/Activity/Activity';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { SectionWrapper } from '../_SectionWrapper/SectionWrapper';

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

export interface LastActivitiesProps {}

export const LastActivities: React.FC<LastActivitiesProps> = () => {
  const activitiesDialogToggler = useToggle();

  const intl = useIntl();

  return (
    <SectionWrapper
      title={intl.formatMessage({ id: 'houseData.lastActivities.title', defaultMessage: 'Last activities' })}>
      {ACTIVITIES.length ? (
        <>
          {ACTIVITIES.map((activity, i) => (
            <Activity key={i} disableBorder={i === ACTIVITIES.length - 1} activity={activity} />
          ))}

          <NavigationLink
            as="div"
            text={intl.formatMessage({ id: 'app.viewAll', defaultMessage: 'View all' })}
            icon={<EyeIcon />}
            onClick={activitiesDialogToggler.set}
            isUnderlines
          />
        </>
      ) : (
        <Text
          text={intl.formatMessage({ id: 'houseData.lastActivities.empty', defaultMessage: 'No activities yet' })}
          variant={TextPropsVariantsEnum.BODY_M}
          color="textSecondary"
        />
      )}

      <TaskActivitiesDialog isOpen={activitiesDialogToggler.value} onClose={activitiesDialogToggler.unset} />
    </SectionWrapper>
  );
};
