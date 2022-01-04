import React from 'react';

import { ColorfulIcon, ColorfulIconTypes, ColorfulIconVariants } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { Drawer } from 'common/components/ui/Drawer/Drawer';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { FooterDefault } from 'routes/tasks/_components/FooterDefault/FooterDefault';
import { HeaderDefault } from 'routes/tasks/_components/HeaderDefault/HeaderDefault';
import { TaskForm } from 'routes/tasks/_components/TaskForm/TaskForm';

import s from './TaskEditModal.module.scss';

export interface TaskEditModalProps {
  isOpen: boolean;

  onBack: () => void;
  onClose: () => void;
}

export const TaskEditModal: React.FC<TaskEditModalProps> = ({ isOpen, onBack, onClose }) => {
  const isMd = useMediaQuery('(max-width: 768px)');

  const content = (
    <>
      <HeaderDefault>
        <>
          <Text
            onClick={onBack}
            className={s.TaskEditModal__row}
            variant={TextPropsVariantsEnum.H3}
            as="div"
            color="textSecondary">
            <ColorfulIcon icon={ColorfulIconTypes.BACK} className={s.TaskEditModal__icon} />
            Edit
          </Text>
          <IconCircle
            icon={<ColorfulIcon icon={ColorfulIconTypes.CLOSE} variant={ColorfulIconVariants.GRAY_SECONDARY} />}
            onClick={onClose}
          />
        </>
      </HeaderDefault>
      <TaskForm isEdit />
      <FooterDefault submitText="Save changes" />
    </>
  );

  return (
    <>
      {isMd ? (
        <Drawer isOpen={isOpen} onClose={onClose} animation="bottom">
          {content}
        </Drawer>
      ) : (
        <Dialog
          isOpen={isOpen}
          onClose={onClose}
          isHeaderShown={false}
          maxWidth={860}
          childrenWrapperClassName={s.TaskEditModal__modal}>
          {content}
        </Dialog>
      )}
    </>
  );
};
