import React, { useState } from 'react';
import { useIntl } from 'react-intl';

import { Formik } from 'formik';
import * as Yup from 'yup';

import { useToggle } from '@proscom/ui-react';
import { IProject } from 'common/components/ui/_cards/ProjectCard/types';
import { TeamSelectDialog } from 'common/components/ui/_dialogs/TeamSelectDialog/TeamSelectDialog';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { TeamMemberType, MEMBERS } from 'routes/houseTeam/HouseTeamViewMembers/tempData';
import { AboutSection } from 'routes/projects/singleProject/ProjectSettingsDialog/sections/AboutSection';
import { AddMembersSection } from 'routes/projects/singleProject/ProjectSettingsDialog/sections/AddMembersSection';
import { ChecklistSection } from 'routes/projects/singleProject/ProjectSettingsDialog/sections/ChecklistSection';
import { DropzoneSection } from 'routes/projects/singleProject/ProjectSettingsDialog/sections/DropzoneSection';
import { HighPrioritySection } from 'routes/projects/singleProject/ProjectSettingsDialog/sections/HighPrioritySection';
import { HouseDataSection } from 'routes/projects/singleProject/ProjectSettingsDialog/sections/HouseDataSection';
import { ResponsibleSection } from 'routes/projects/singleProject/ProjectSettingsDialog/sections/ResponsibleSection';
import { SETTINGS_FORM_INITIAL_VALUES } from 'routes/projects/singleProject/ProjectSettingsDialog/temp-data';
import { createTaskFieldName } from 'routes/projects/singleProject/ProjectStartStopDialog/createTaskFieldName';

import s from './ProjectSettingsDialog.module.scss';

type TProjectSettingsDialog = {
  onClickCancelBtn: () => void;
  onClickSaveBtn: () => void;
  onClose: () => void;
  onSubmit: () => void;
  project: IProject;
};

const validationSchema = Yup.object();

export const ProjectSettingsDialog = React.forwardRef<any, TProjectSettingsDialog>((props, ref) => {
  const { onClickCancelBtn, onClickSaveBtn, onClose, onSubmit, project } = props;

  const intl = useIntl();

  const modalTitle = intl.formatMessage({
    defaultMessage: 'Setting project',
    id: 'project.modal.settings.title'
  });

  const cancelBtnText = intl.formatMessage({
    defaultMessage: 'Cancel',
    id: 'project.modal.settings.cancel'
  });

  const saveBtnText = intl.formatMessage({
    defaultMessage: 'Save changes',
    id: 'project.modal.settings.confirm'
  });

  const { members, tasks } = project || {};

  const dialogToggler = useToggle();
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMemberType | null>(members?.[0] || null);

  const isMembers = !!members?.length;
  const isTasks = !!tasks?.length;

  const team = MEMBERS;

  const tasksFields = project?.tasks.map((task) => createTaskFieldName(task));

  const INITIAL_VALUES_TASKS = Object.fromEntries(tasksFields?.map((task) => [task, false]) || []);

  const initialValues = {
    ...SETTINGS_FORM_INITIAL_VALUES,
    ...INITIAL_VALUES_TASKS
  };

  const handleAddMember = () => {
    dialogToggler.set();
  };

  return (
    <Dialog
      cancelBtnText={cancelBtnText}
      cancelClassName={s.ProjectSettingsDialog__btn_cancel}
      childrenClassName={s.ProjectSettingsDialog__children}
      childrenWrapperClassName={s.ProjectSettingsDialog__container}
      disableOverflowControl
      footerClassName={s.ProjectSettingsDialog__footer}
      headerClassName={s.ProjectSettingsDialog__header}
      icon={ColorfulIconTypes.SETTINGS}
      iconClassName={s.ProjectSettingsDialog__header_icon}
      isOpen
      newDesign
      onClickCancelBtn={onClickCancelBtn}
      onClickSaveBtn={onClickSaveBtn}
      onClose={onClose}
      saveBtnText={saveBtnText}
      saveClassName={s.ProjectSettingsDialog__btn_save}
      title={modalTitle}
      titleClassName={s.ProjectSettingsDialog__title}
    >
      <Formik
        enableReinitialize
        initialValues={initialValues}
        innerRef={ref}
        onSubmit={onSubmit}
        validateOnBlur
        validateOnChange={false}
        validationSchema={validationSchema}
      >
        <>
          <AboutSection />

          {isMembers ? (
            <ResponsibleSection
              dialogToggler={dialogToggler}
              projectMembers={project?.members}
              selectedTeamMember={selectedTeamMember}
              setSelectedTeamMember={setSelectedTeamMember}
            />
          ) : (
            <AddMembersSection onAddClick={handleAddMember} />
          )}

          {dialogToggler.value && (
            <TeamSelectDialog
              blackoutClassName={s.ProjectSettingsDialog__TeamSelectDialog_blackout}
              initialSelectedMember={selectedTeamMember}
              isOpen
              isTaskDialog
              members={team || []}
              onBack={dialogToggler.unset}
              onClose={dialogToggler.unset}
              setSelectedTeamMember={setSelectedTeamMember}
            />
          )}

          <HighPrioritySection />

          <ChecklistSection />

          <HouseDataSection />

          <DropzoneSection />
        </>
      </Formik>
    </Dialog>
  );
});
