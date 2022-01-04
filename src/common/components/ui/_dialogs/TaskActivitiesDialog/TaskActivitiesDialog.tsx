import React from 'react';

import { Activity } from 'common/components/ui/Activity/Activity';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog, IDialogProps } from 'common/components/ui/Dialog/Dialog';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import s from './TaskActivitiesDialog.module.scss';

// TODO remove useless data
const ACTIVITIES = new Array(4).fill({
  actionName: 'added administrator',
  actorName: 'Mikhail Karlov',
  entityName: 'My Little Cozy House',
  time: 'Just now'
});

export interface TaskActivitiesDialogProps {
  dialogProps?: Partial<Omit<IDialogProps, 'isOpen' | 'onClose' | 'icon' | 'title'>>;
  isOpen: boolean;

  onClose: () => void;
}

export const TaskActivitiesDialog: React.FC<TaskActivitiesDialogProps> = ({ dialogProps, isOpen, onClose }) => {
  const renderActivities = () => (
    <>
      {ACTIVITIES.map((activity, i) => (
        <Activity activity={activity} disableBorder={i === ACTIVITIES.length - 1} key={i} />
      ))}
    </>
  );

  return (
    <Dialog
      icon={ColorfulIconTypes.TASK}
      isOpen={isOpen}
      onClose={onClose}
      title="Care of wardrobe items"
      {...dialogProps}>
      <section className={s.TaskActivitiesDialog__section}>
        <Text
          className={s.TaskActivitiesDialog__title}
          color="textSecondary"
          text="September, 10th, 2021"
          variant={TextPropsVariantsEnum.CAPTION_M}
        />

        {renderActivities()}
      </section>

      <section className={s.TaskActivitiesDialog__section}>
        <Text
          className={s.TaskActivitiesDialog__title}
          color="textSecondary"
          text="September, 10th, 2021"
          variant={TextPropsVariantsEnum.CAPTION_M}
        />

        {renderActivities()}
      </section>

      <section className={s.TaskActivitiesDialog__section}>
        <Text
          className={s.TaskActivitiesDialog__title}
          color="textSecondary"
          text="September, 10th, 2021"
          variant={TextPropsVariantsEnum.CAPTION_M}
        />

        {renderActivities()}
      </section>
    </Dialog>
  );
};
