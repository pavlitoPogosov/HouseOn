import React from 'react';
import { useIntl } from 'react-intl';

import clsx from 'clsx';

import { getRightStatusType } from 'common/components/ui/_cards/ProjectCard/getRightStatusType';
import { IProject } from 'common/components/ui/_cards/ProjectCard/types';
import { Accordion } from 'common/components/ui/Accordion/Accordion';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { isProjectOrTaskPaused } from 'routes/projects/singleProject/isProjectOrTaskPaused';
import s from 'routes/projects/singleProject/ProjectStartStopDialog/sections/styles.module.scss';

type TSectionTasks = {
  isTasks: boolean;
  project: IProject | undefined;
  tasksTitle: string;
};

export const SectionTasks: React.FC<TSectionTasks> = (props) => {
  const { isTasks, project, tasksTitle } = props;

  const intl = useIntl();

  const activeTasks = project?.tasks?.filter((task) => {
    const taskStatusType = getRightStatusType(task);
    return !isProjectOrTaskPaused(taskStatusType);
  });

  const byText = intl.formatMessage({
    defaultMessage: 'by',
    id: 'project.modal.stop.by'
  });

  return (
    <div className={s.ProjectStartedContent__tasks_wrapper}>
      {isTasks && !!activeTasks?.length && (
        <div className={s.tasks__container}>
          <Accordion
            containerClassName={s.tasks__accordion}
            headerClassName={s.tasks__accordion_header}
            headerIconClassName={s.tasks__accordion_header_icon}
            title={tasksTitle}
            titleClassName={s.tasks__accordion_title}
            toggleableClassName={s.tasks__accordion_toggleable}>
            <div className={s.tasks__list}>
              {activeTasks?.map((task) => (
                <div className={clsx(s.tasks__task_container, s.task__active)} key={task.id}>
                  <Text className={s.task__title_active} variant={TextPropsVariantsEnum.BODY_M}>
                    {task.title}
                  </Text>

                  <Text
                    className={s.task__author_active}
                    color="textTretiary"
                    variant={TextPropsVariantsEnum.CAPTION_M}>
                    {`${byText} ${task.author?.name}`}
                  </Text>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      )}
    </div>
  );
};
