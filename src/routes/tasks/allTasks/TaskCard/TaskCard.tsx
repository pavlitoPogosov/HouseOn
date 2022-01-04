import React from 'react';
import { useIntl } from 'react-intl';

import clsx from 'clsx';

import { NBSP } from '@proscom/ui-utils';
import { ReactComponent as ProjectSecondaryIcon } from 'assets/icons/project-secondary.svg';
import { ReactComponent as RocketIcon } from 'assets/icons/rocket.svg';
import { ReactComponent as TaskSecondaryIcon } from 'assets/icons/task-secondary.svg';
import { ReactComponent as TeamIcon } from 'assets/icons/team.svg';
import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { Checkbox } from 'common/components/ui/Checkbox/Checkbox';
import { ColorfulIcon, ColorfulIconTypes, ColorfulIconVariants } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { Status } from 'routes/tasks/_components/TaskViewModal/Status/Status';
import { ITaskCard, TaskTypeState } from 'routes/tasks/allTasks/TaskCard/cardTemp';

import s from './TaskCard.module.scss';

export enum TaskCardVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}


export interface TaskCardProps {
  card: ITaskCard;
  variant?: TaskCardVariant;

  containerClassName?: string;
  onClick: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = (props) => {
  const {
    containerClassName,
    variant = TaskCardVariant.PRIMARY,
    card,
    onClick
  } = props
  const intl = useIntl();

  return (
    <div
      onClick={variant === TaskCardVariant.SECONDARY ? onClick : () => {}}
      className={clsx([s.TaskCard, containerClassName])}
    >
      <div className={clsx(s.TaskCard__action, s.TaskCard__item)}>
        <Checkbox
          containerClassName={s.TaskCard__checkboxContainer}
          checkboxClassName={s.TaskCard__checkbox}
          disabled
          checked
        />
        <Text as="div" className={s.TaskCard__title} variant={TextPropsVariantsEnum.BODY_M}>
          {card.isHighPriority && (
            <ColorfulIcon
              className={s.TaskCard__mr}
              icon={ColorfulIconTypes.LIGHTNING}
              variant={ColorfulIconVariants.ORANGE}
            />
          )}
          Care of wardrobe items
        </Text>
      </div>
      <div className={clsx(s.TaskCard__status, s.TaskCard__item)}>
        <Status status={card.status} />
      </div>
      <div className={clsx(s.TaskCard__projectType, s.TaskCard__item)}>
        {card.type === TaskTypeState.DEFAULT ? (
          <>
            <RocketIcon className={s.TaskCard__mr} />
            <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
              Quick project
            </Text>
          </>
        ) : (
          <>
            <ProjectSecondaryIcon className={s.TaskCard__mr} />
            <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
              Basic: <span className={s.TaskCard__highlight}>Home ownership care</span>
            </Text>
          </>
        )}
      </div>
      {variant === TaskCardVariant.PRIMARY &&
      <div className={clsx(s.TaskCard__team, s.TaskCard__item)}>
        <TeamIcon className={s.TaskCard__mr} />
        <Text as="div" className={s.TaskCard__flex} variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
          House team:
          <Avatar containerClassName={clsx(s.TaskCard__mr, s.TaskCard__ml)} width={16} height={16} />
          <span className={s.TaskCard__highlight}>Flores, Juan</span>
        </Text>
      </div>
      }
      <div className={clsx(s.TaskCard__created, s.TaskCard__item)}>
        <Text as="div" variant={TextPropsVariantsEnum.CAPTION_R} className={s.TaskCard__created_text}>
          <ColorfulIcon className={s.TaskCard__created_icon} icon={ColorfulIconTypes.CLOCK} />
          {NBSP}
          {intl.formatMessage({ id: 'houseTeam.task.started', defaultMessage: 'Started by' })}
        </Text>
        {NBSP}
        <Text variant={TextPropsVariantsEnum.CAPTION_R} className={s.TaskCard__created_date}>
          Maria Ankerville
        </Text>
      </div>
      {variant === TaskCardVariant.PRIMARY &&
      <div
        onClick={onClick}
        className={clsx(s.TaskCard__details, s.TaskCard__item)}
      >
        <Text className={s.TaskCard__details_text} variant={TextPropsVariantsEnum.BODY_M} color="textBrand">
          <TaskSecondaryIcon className={clsx(s.TaskCard__mr, s.TaskCard__details_icon)}/>
          Details
        </Text>
      </div>
      }
    </div>
  );
};
