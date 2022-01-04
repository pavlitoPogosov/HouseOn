import React from 'react';

import { Dialog } from 'common/components/ui/Dialog/Dialog';

import { TaskModalContent } from './TaskModalContent/TaskModalContent';

import s from './TaskModal.module.scss';

type TTaskModal = {
  isOpen: boolean;
  onClose: () => void;
};

export const TaskModal = (props: TTaskModal): JSX.Element => {
  const { isOpen, onClose } = props;

  return (
    <Dialog
      childrenWrapperClassName={s.TaskModal__children_wrapper}
      isHeaderShown={false}
      isOpen={isOpen}
      onClose={onClose}>
      <TaskModalContent />
    </Dialog>
  );
};
