import React from 'react';

import { ReactComponent as TaskSecondaryIcon } from 'assets/icons/task-secondary.svg';
import { ColorfulIcon, ColorfulIconTypes, ColorfulIconVariants } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { Drawer } from 'common/components/ui/Drawer/Drawer';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { FooterDefault } from 'routes/tasks/_components/FooterDefault/FooterDefault';
import { HeaderDefault } from 'routes/tasks/_components/HeaderDefault/HeaderDefault';
import { TaskForm } from 'routes/tasks/_components/TaskForm/TaskForm';

import s from './TaskCreateModal.module.scss';

export interface TaskCreateModalProps {
  isOpen: boolean;

  onClose: () => void;
}

export const TaskCreateModal: React.FC<TaskCreateModalProps> = ({ isOpen, onClose }) => {
  const isMd = useMediaQuery('(max-width: 768px)');

  const content = (
    <>
      <HeaderDefault>
        <>
          <Text variant={TextPropsVariantsEnum.H3} color="textSecondary">
            <TaskSecondaryIcon className={s.TaskCreateModal__icon} />
            New task
          </Text>
          <IconCircle
            icon={<ColorfulIcon icon={ColorfulIconTypes.CLOSE} variant={ColorfulIconVariants.GRAY_SECONDARY} />}
            onClick={onClose}
          />
        </>
      </HeaderDefault>
      <TaskForm />
      <FooterDefault submitText="Create task" />
    </>
  );

  return (
    <>
      {isMd ? (
        <Drawer isOpen={isOpen} onClose={onClose} animation="bottom" containerClassName={s.TaskCreateModal__modal}>
          {content}
        </Drawer>
      ) : (
        <Dialog
          isOpen={isOpen}
          onClose={onClose}
          isHeaderShown={false}
          maxWidth={860}
          childrenWrapperClassName={s.TaskCreateModal__modal}
        >
          {content}
        </Dialog>
      )}
    </>
  );
};
