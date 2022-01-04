import React, { useRef } from 'react';
import { useIntl } from 'react-intl';

import { FormikProps } from 'formik';

import { useToggle } from '@proscom/ui-react';
import { getRightStatusType } from 'common/components/ui/_cards/ProjectCard/getRightStatusType';
import { ITask } from 'common/components/ui/_cards/TaskCard/types';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { createToast } from 'redux/slices/toastSlice/actionCreators';
import { AsideLayoutRight } from 'routes/_layouts/AsideLayoutRight/AsideLayoutRight';
import { isProjectOrTaskPaused } from 'routes/projects/singleProject/isProjectOrTaskPaused';
import { ProjectSettingsDialog } from 'routes/projects/singleProject/ProjectSettingsDialog/ProjectSettingsDialog';
import { TSettingsFormFields } from 'routes/projects/singleProject/ProjectSettingsDialog/types';
import { ProjectStartStopDialog } from 'routes/projects/singleProject/ProjectStartStopDialog/ProjectStartStop';
import { PROJECTS } from 'routes/projects/temp-data';
import { submitFormikFormWithRef } from 'utils/formikUtils';

import { SingleProjectHouseData } from './SingleProjectHouseData/SingleProjectHouseData';
import { SingleProjectsTasks } from './SingleProjectsTasks/SingleProjectsTasks';

import s from './SingleProjectPage.module.scss';

export const SingleProjectPage: React.FC<unknown> = () => {
  const isAsideHidden = useMediaQuery('(max-width: 1199px)');
  const modalToggler = useToggle();
  const modalSettingsToggler = useToggle();
  const dispatch = useTypedDispatch();
  const intl = useIntl();

  const project = PROJECTS[0];
  const statusType = getRightStatusType(project);
  const isPaused = isProjectOrTaskPaused(statusType);

  const onProjectStartSuccess = () => {
    dispatch(createToast({
      dismissTimeout: 3000,
      text: intl.formatMessage({
        defaultMessage: `You’ve started the project "${project.title}"`,
        id: 'project.start.success.text',
      }),
    }));
  };

  const onProjectStopSuccess = () => {
    dispatch(createToast({
      dismissTimeout: 3000,
      text: intl.formatMessage({
        defaultMessage: `You’ve stopped the project "${project.title}"`,
        id: 'project.start.success.text',
      }),
    }));
  };

  const onTaskStartSuccess = (task: ITask) => {
    dispatch(createToast({
      dismissTimeout: 3000,
      text: intl.formatMessage({
        defaultMessage: `You’ve started the task "${task.title}"`,
        id: 'project.start.success.text',
      }),
    }));
  };

  const onTaskStopSuccess = (task: ITask) => {
    dispatch(createToast({
      dismissTimeout: 3000,
      text: intl.formatMessage({
        defaultMessage: `You’ve stopped the task "${task.title}"`,
        id: 'project.start.success.text',
      }),
    }));
  };

  const handleStartProject = () => {
    // onProjectStartSuccess();
    modalToggler.set();
  };

  const handleStopProject = () => {
    // onProjectStopSuccess();
    modalToggler.set();
  };

  const handleCloseModal = () => {
    // onProjectStopSuccess();
    if (modalToggler.value) {
      modalToggler.unset();
    }
  };

  const handleStartTask = (task: ITask) => {
    onTaskStartSuccess(task);
  };

  const handleStopTask = (task: ITask) => {
    onTaskStopSuccess(task);
  };

  const handleSettingsClick = () => {
    modalSettingsToggler.set();
  };

  const handleSettingsCancel = () => {};
  const handleSettingsClose = () => {
    modalSettingsToggler.unset();
  };
  const handleSettingsSave = () => {};

  const settingsFormikRef = useRef<FormikProps<TSettingsFormFields> | null>(null);

  const handleSettingSubmit = () => {
    submitFormikFormWithRef(settingsFormikRef, (values: TSettingsFormFields) => {
      console.log('Settings project', values);
    });
  };

  return (
    <AsideLayoutRight
      asideClassName={s.SingleProjectPage__aside}
      asideCmp={<SingleProjectHouseData />}
      mainClassName={s.SingleProjectPage__main}
      mainCmp={
        (
          <>
            <SingleProjectsTasks
              isPaused={isPaused}
              onSettingsClick={handleSettingsClick}
              onStartProject={handleStartProject}
              onStartTask={handleStartTask}
              onStopProject={handleStopProject}
              onStopTask={handleStopTask}
              statusType={statusType}
            />

            {
              modalToggler.value && (
                <ProjectStartStopDialog
                  isPaused={isPaused}
                  onClose={handleCloseModal}
                  project={project}
                  statusType={statusType}
                />
              )
            }

            {
              modalSettingsToggler.value && (
                <ProjectSettingsDialog
                  onClickCancelBtn={handleSettingsCancel}
                  onClickSaveBtn={handleSettingsSave}
                  onClose={handleSettingsClose}
                  onSubmit={handleSettingSubmit}
                  project={project}
                  ref={settingsFormikRef}
                />
              )
            }

            {isAsideHidden && <SingleProjectHouseData />}
          </>
        )
      }
      mobileQuery="(max-width: 1199px)"
    />
  );
};
