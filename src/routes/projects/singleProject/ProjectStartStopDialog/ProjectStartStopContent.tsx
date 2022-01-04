import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useToggle } from '@proscom/ui-react';
import { EStatusBadgeTypesEnum } from 'common/components/ui/_badges/StatusBadge/StatusBadge';
import { IProject } from 'common/components/ui/_cards/ProjectCard/types';
import { TeamSelectDialog } from 'common/components/ui/_dialogs/TeamSelectDialog/TeamSelectDialog';
import { MEMBERS, TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';
import { isProjectOrTaskPaused } from 'routes/projects/singleProject/isProjectOrTaskPaused';
import { createTaskFieldName } from 'routes/projects/singleProject/ProjectStartStopDialog/createTaskFieldName';
import { SectionAddMembers } from 'routes/projects/singleProject/ProjectStartStopDialog/sections/SectionAddMembers';
import { SectionControls } from 'routes/projects/singleProject/ProjectStartStopDialog/sections/SectionControls';
import { SectionInfo } from 'routes/projects/singleProject/ProjectStartStopDialog/sections/SectionInfo';
import { SectionMembers } from 'routes/projects/singleProject/ProjectStartStopDialog/sections/SectionMembers';
import { SectionTasks } from 'routes/projects/singleProject/ProjectStartStopDialog/sections/SectionTasks';
import { SectionTasksCheckbox } from 'routes/projects/singleProject/ProjectStartStopDialog/sections/SectionTasksCheckbox';
import s from 'routes/projects/singleProject/ProjectStartStopDialog/sections/styles.module.scss';
import { EProjectStartedContentFields } from 'routes/projects/singleProject/ProjectStartStopDialog/types';

type TProjectStartedContent = {
  onCancel: () => void;
  onClose: () => void;
  onSubmit: () => void;
  project: IProject | undefined;
  statusType: EStatusBadgeTypesEnum;
};

const memberSelectionError = 'You have to add a member of House Team to start the project.';
const taskSelectionError = 'Please select at least one task';

const BASIC_SCHEMA = { [EProjectStartedContentFields.MEMBER]: Yup.mixed().required(memberSelectionError) };

const VALIDATION_SCHEMA = Yup.lazy((values) => {
  const isTaskSelected = Object.entries(values).find(([field, value]) => field.toLowerCase().includes('task') && value);
  if (!isTaskSelected) {
    return Yup.object().shape({
      ...BASIC_SCHEMA,
      [EProjectStartedContentFields.ALL_TASKS]: Yup.boolean()
        .typeError(taskSelectionError)
        .oneOf([true], taskSelectionError)
        .required(taskSelectionError)
    });
  }
  return Yup.object().shape({ ...BASIC_SCHEMA });
});

export const ProjectStartStopContent = React.forwardRef<any, TProjectStartedContent>((props, ref) => {
  const { onCancel, onClose, onSubmit, project, statusType } = props;

  const { members, tasks } = project || {};

  const intl = useIntl();

  const dialogToggler = useToggle();
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMemberType | null>(members?.[0] || null);

  const isMembers = !!members?.length;
  const isTasks = !!tasks?.length;

  const team = MEMBERS;

  const isStarted = !isProjectOrTaskPaused(statusType);

  const tasksFields = project?.tasks.map((task) => createTaskFieldName(task));

  const INITIAL_VALUES_BASIC = {
    [EProjectStartedContentFields.ALL_TASKS]: undefined,
    [EProjectStartedContentFields.MEMBER]: undefined
  };

  const INITIAL_VALUES_TASKS = Object.fromEntries(tasksFields?.map((task) => [task, false]) || []);

  const INITIAL_VALUES = {
    ...INITIAL_VALUES_BASIC,
    ...INITIAL_VALUES_TASKS
  };

  const tasksTitle = isStarted
    ? intl.formatMessage({
        defaultMessage: 'Active tasks in this project',
        id: 'projects.single.dialogs.stop.tasks.title'
      })
    : intl.formatMessage({
        defaultMessage: 'All tasks in this project',
        id: 'projects.single.dialogs.start.tasks.title'
      });

  return (
    <Formik
      enableReinitialize
      // initialTouched={EVENT_FORM_INITIAL_TOUCHED as FormikTouched<unknown>}
      initialValues={isStarted ? {} : INITIAL_VALUES}
      innerRef={ref}
      isInitialValid={isStarted}
      onSubmit={onSubmit}
      validateOnBlur
      validateOnChange
      validationSchema={isStarted ? Yup.object() : VALIDATION_SCHEMA}
    >
      <>
        <div className={s.ProjectStartedContent__container}>
          <SectionInfo project={project} statusType={statusType} />

          {!isStarted &&
            (isMembers ? (
              <SectionMembers
                dialogToggler={dialogToggler}
                projectMembers={project?.members}
                selectedTeamMember={selectedTeamMember}
                setSelectedTeamMember={setSelectedTeamMember}
              />
            ) : (
              <SectionAddMembers onAddClick={dialogToggler.set} />
            ))}

          {dialogToggler.value && (
            <TeamSelectDialog
              blackoutClassName={s.ProjectStartedContent__TeamSelectDialog_blackout}
              initialSelectedMember={selectedTeamMember}
              isOpen
              isTaskDialog
              members={team || []}
              onBack={dialogToggler.unset}
              onClose={dialogToggler.unset}
              setSelectedTeamMember={setSelectedTeamMember}
            />
          )}

          {isStarted ? (
            <SectionTasks isTasks={isTasks} project={project} tasksTitle={tasksTitle} />
          ) : (
            <SectionTasksCheckbox
              isTasks={isTasks}
              project={project}
              tasksFields={tasksFields || []}
              tasksTitle={tasksTitle}
            />
          )}

          <SectionControls isStarted={isStarted} onCancel={onCancel} onSubmit={onSubmit} />
        </div>
      </>
    </Formik>
  );
});
