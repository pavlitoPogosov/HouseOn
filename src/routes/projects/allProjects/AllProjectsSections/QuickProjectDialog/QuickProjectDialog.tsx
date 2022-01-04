import React, { useRef, useState } from 'react';

import { FormikProps } from 'formik';

import { IProject } from 'common/components/ui/_cards/ProjectCard/types';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { MEMBERS } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

import { ProjectForm, PROJECT_FORM_INITIAL_VALUES } from './ProjectForm/ProjectForm';

import s from './QuickProjectDialog.module.scss';

export interface IQuickProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  project: IProject;
}

export enum ModalTypes {
  FORM = 0,
  HOUSE_TEAM = 1,
  INFORM_MEMBERS = 2
}

// TODO add validation schema
export const QuickProjectDialog: React.FC<IQuickProjectDialogProps> = (props) => {
  const { isOpen, onClose, project } = props;

  const [activeType, setActiveType] = useState<ModalTypes>(ModalTypes.FORM);
  const [savedValues, setSavedValues] = useState<typeof PROJECT_FORM_INITIAL_VALUES | null>(null);

  const formikRef = useRef<FormikProps<typeof PROJECT_FORM_INITIAL_VALUES> | null>(null);

  const handleCreateProject = () => {};

  const handleClickSaveBtn = () => {
    if (activeType === ModalTypes.HOUSE_TEAM || activeType === ModalTypes.INFORM_MEMBERS) {
      setActiveType(ModalTypes.FORM);
    } else {
      formikRef.current?.submitForm();
    }
  };

  const handleClickCloseBtn = () => {
    if (activeType === ModalTypes.HOUSE_TEAM || activeType === ModalTypes.INFORM_MEMBERS) {
      setActiveType(ModalTypes.FORM);
    } else {
      onClose();
    }
  };

  return (
    <Dialog
      closeClassName={s.QuickProjectDialog__close}
      headerClassName={s.QuickProjectDialog__header}
      icon={ColorfulIconTypes.ROCKET}
      iconClassName={s.QuickProjectDialog__icon}
      isOpen={isOpen}
      onClose={onClose}
      title="We watch a film"
      titleClassName={s.QuickProjectDialog__title}>
      <ProjectForm
        activeType={activeType}
        members={MEMBERS}
        onCancelClick={handleClickCloseBtn}
        onSubmitClick={handleClickSaveBtn}
        project={project}
        ref={formikRef}
        savedValues={savedValues}
        setActiveType={setActiveType}
        setSavedValues={setSavedValues}
      />
    </Dialog>
  );
};
