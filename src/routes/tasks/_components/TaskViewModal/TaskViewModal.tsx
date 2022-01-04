import React, { useRef, useState } from 'react';

import clsx from 'clsx';

import { ReactComponent as ProjectSecondaryIcon } from 'assets/icons/project-secondary.svg';
import { ReactComponent as TaskSecondaryIcon } from 'assets/icons/task-secondary.svg';
import { FolderCard } from 'common/components/ui/_cards/FolderCard/FolderCard';
import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { Drawer } from 'common/components/ui/Drawer/Drawer';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { HOUSE_DATA_FILES } from 'routes/projects/temp-data';
import { FooterView } from 'routes/tasks/_components/FooterView/FooterView';
import { FormNotification } from 'routes/tasks/_components/FormNotification/FormNotification';
import { HeaderView } from 'routes/tasks/_components/HeaderView/HeaderView';
import { ChecklistField } from 'routes/tasks/_components/TaskForm/ChecklistField/ChecklistField';
import { CommentsView } from 'routes/tasks/_components/TaskViewModal/CommentsView/CommentsView';
import { LastActivities } from 'routes/tasks/_components/TaskViewModal/LastActivities/LastActivities';
import { Status, StatusState } from 'routes/tasks/_components/TaskViewModal/Status/Status';

import s from './TaskViewModal.module.scss';

export interface TaskViewModalProps {
  isOpen: boolean;

  onClose: () => void;
  onEdit: () => void;
}

export const TaskViewModal: React.FC<TaskViewModalProps> = ({ isOpen, onClose, onEdit }) => {
  const [headerSticky, setHeaderSticky] = useState<boolean>(false);

  const headerRef = useRef<HTMLDivElement | null>(null);

  const onScroll = (event: React.UIEvent<HTMLDivElement>) => {
    if (headerRef.current) {
      // @ts-ignore
      if (event.target.scrollTop > headerRef.current?.offsetHeight && !headerSticky) {
        setHeaderSticky(true);
      }
      // @ts-ignore
      if (event.target.scrollTop <= headerRef.current?.offsetHeight && headerSticky) {
        setHeaderSticky(false);
      }
    }
  };

  const isMd = useMediaQuery('(max-width: 768px)');

  const content = (
    <>
      <HeaderView
        ref={headerRef}
        headerSticky={headerSticky}
        stickyText="We watch a film"
        status={StatusState.ARCHIVED}
        onClose={onClose}
        onEdit={onEdit}
      />
      <div className={s.TaskViewModal__body}>
        <div className={s.TaskViewModal__block}>
          <Text className={s.TaskViewModal__title} variant={isMd ? TextPropsVariantsEnum.H3 : TextPropsVariantsEnum.H2}>
            <TaskSecondaryIcon className={s.TaskViewModal__icon} /> We watch a film
          </Text>
          <div className={s.TaskViewModal__status}>
            <Status status={StatusState.IN_WORK} />
          </div>
          <Text className={s.TaskViewModal__info} variant={TextPropsVariantsEnum.CAPTION_R}>
            Started 03.09.21 by <span className={s.TaskViewModal__highlight}>Maria Ankerville</span>
            Last changed 05.09.21 by <span className={s.TaskViewModal__highlight}>Maria Ankerville</span>
            Previously, we planned to spend 4-6 days to complete this task.
          </Text>
        </div>
        <div className={s.TaskViewModal__block}>
          <Text variant={TextPropsVariantsEnum.BODY_L} className={s.TaskViewModal__small_title}>
            About the task
          </Text>
          <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
            This is the description of the section that we attached so that it was here. This is the description of the
            section that we attached so that it was here.
          </Text>
        </div>
        <div className={s.TaskViewModal__block}>
          <Text variant={TextPropsVariantsEnum.BODY_L} className={s.TaskViewModal__small_title}>
            Periodicity
          </Text>
          <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
            This task will be made once <span className={s.TaskViewModal__highlight}>every 5 days</span> since today
            until 22.12.2021
          </Text>
        </div>
        <div className={s.TaskViewModal__block}>
          <Text variant={TextPropsVariantsEnum.BODY_L} className={s.TaskViewModal__small_title}>
            Required house team
          </Text>
          <div className={s.TaskViewModal__user}>
            <Avatar containerClassName={s.TaskViewModal__user_avatar} />
            <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
              Roberto Mielgo
            </Text>
          </div>
        </div>
        <div className={s.TaskViewModal__block}>
          <Text variant={TextPropsVariantsEnum.BODY_L} className={s.TaskViewModal__small_title}>
            Project
          </Text>
          <div className={s.TaskViewModal__project}>
            <ProjectSecondaryIcon className={s.TaskViewModal__icon} />
            <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
              Basic: <span className={s.TaskViewModal__highlight}>Home ownership care</span>
            </Text>
          </div>
        </div>
        <div className={s.TaskViewModal__block}>
          <Text variant={TextPropsVariantsEnum.BODY_L} className={s.TaskViewModal__small_title}>
            Checklist
          </Text>
          <>
            <FormNotification>
              <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
                There is checklist is recommended by Albert. You can make yours list, or change current.
              </Text>
            </FormNotification>
            <ChecklistField isAddNew={false} isHideRemove={true} />
          </>
        </div>
        <div className={s.TaskViewModal__block}>
          <Text variant={TextPropsVariantsEnum.BODY_L} className={s.TaskViewModal__small_title}>
            House Data
          </Text>
          <>
            <FormNotification>
              <Text variant={TextPropsVariantsEnum.BODY_M} color="textSecondary">
                There is HouseData which is linked to the project. You can close access to some of them by breaking the
                link icon or keep them visible in this task
              </Text>
            </FormNotification>
            {HOUSE_DATA_FILES.map((file, index) => (
              <FolderCard key={index} file={file} cardClassName={s.TaskViewModal__folderCard} />
            ))}
          </>
        </div>
        <div className={s.TaskViewModal__block}>
          <Text variant={TextPropsVariantsEnum.BODY_L} className={s.TaskViewModal__small_title}>
            Last activities
          </Text>
          <LastActivities />
        </div>
        <div className={clsx(s.TaskViewModal__block, s.TaskViewModal__block_gray, s.TaskViewModal__block_pt)}>
          <Text variant={TextPropsVariantsEnum.BODY_L} className={s.TaskViewModal__small_title}>
            Comments
          </Text>
          <CommentsView />
        </div>
      </div>
      <FooterView />
    </>
  );
  return (
    <>
      {isMd ? (
        <Drawer isOpen={isOpen} onClose={onClose} onScroll={onScroll} animation="bottom">
          {content}
        </Drawer>
      ) : (
        <Dialog
          isOpen={isOpen}
          onClose={onClose}
          isHeaderShown={false}
          maxWidth={860}
          childrenWrapperClassName={s.TaskViewModal__modal}
          onScroll={onScroll}>
          {content}
        </Dialog>
      )}
    </>
  );
};
