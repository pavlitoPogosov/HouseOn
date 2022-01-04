import React from 'react';

import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { ReactComponent as TaskIcon } from 'assets/icons/task.svg';
import { StatusBadge, EStatusBadgeTypesEnum } from 'common/components/ui/_badges/StatusBadge/StatusBadge';
import { ColorfulIcon, ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { ToggleSwitch } from 'common/components/ui/ToggleSwitch/ToggleSwitch';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import s from './TaskSection.module.scss';

export interface TaskSectionProps {
  onClose: () => void;
}

export const TaskSection: React.FC<TaskSectionProps> = ({ onClose }) => {
  const shouldAdapt = useMediaQuery('(max-width: 768px)');

  return (
    <div className={s.TaskSection__container}>
      <IconCircle
        className={s.TaskSection__backIcon}
        height={32}
        icon={<ChevronLeftIcon />}
        onClick={onClose}
        width={32}
      />

      {/* TODO separate in single cmp  */}

      <div className={s.TaskSection__task}>
        <div className={s.TaskSection__content}>
          <div className={s.TaskSection__icon}>
            <TaskIcon />
          </div>

          <Text
            className={s.TaskSection__text}
            text="Care of wardrobe items"
            variant={shouldAdapt ? TextPropsVariantsEnum.BODY_M : TextPropsVariantsEnum.BODY_L}
          />

          <StatusBadge containerClassName={s.TaskSection__badge} statusType={EStatusBadgeTypesEnum.IS_ACTIVE} />
        </div>

        <ToggleSwitch containerClassName={s.TaskSection__toggle} size="sm" />
      </div>

      <ColorfulIcon className={s.TaskSection__closeIcon} icon={ColorfulIconTypes.CLOSE} onClick={onClose} />
    </div>
  );
};
