import React, { useState, useRef } from 'react';
import { useIntl } from 'react-intl';

import { FormikProps } from 'formik';

import { useToggle } from '@proscom/ui-react';
import { EStatusBadgeTypesEnum } from 'common/components/ui/_badges/StatusBadge/StatusBadge';
import { IProject } from 'common/components/ui/_cards/ProjectCard/types';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { TEventData } from 'routes/events/_common/types';
import { DialogConfirmStop } from 'routes/projects/singleProject/ProjectStartStopDialog/DialogConfirmStop';
import { ProjectStartStopContent } from 'routes/projects/singleProject/ProjectStartStopDialog/ProjectStartStopContent';
import s from 'routes/projects/singleProject/ProjectStartStopDialog/sections/styles.module.scss';
import { TeamRequiredContent } from 'routes/projects/singleProject/ProjectStartStopDialog/TeamRequiredContent';
import { EProjectStartStopDialogTypes } from 'routes/projects/singleProject/ProjectStartStopDialog/types';
import { submitFormikFormWithRef } from 'utils/formikUtils';

export interface IProjectStartStopDialogProps {
  isPaused: boolean;
  onClose: () => void;
  project: IProject | undefined;
  statusType: EStatusBadgeTypesEnum;
}

export const ProjectStartStopDialog: React.FC<IProjectStartStopDialogProps> = (props) => {
  const { isPaused, onClose, project, statusType } = props;

  const intl = useIntl();
  const modalConfirmStopToggler = useToggle();

  const [dialogActiveType, setDialogActiveType] = useState<EProjectStartStopDialogTypes>(
    EProjectStartStopDialogTypes.PROJECT_START_STOP
  );

  const formikRef = useRef<FormikProps<TEventData> | null>(null);

  const handleSubmit = () => {
    if (isPaused) {
      submitFormikFormWithRef(formikRef, (values: any) => {
        // console.log('Start project', values);
      });
    } else {
      setDialogActiveType(EProjectStartStopDialogTypes.PROJECT_STOP_CONFIRM);
      modalConfirmStopToggler.set();
    }
  };

  const handleCancelClick = () => {};

  const modalTitle = intl.formatMessage({
    defaultMessage: 'Starting the project',
    id: 'projects.single.dialogs.start.title'
  });

  const handleConfirmStopCancel = () => {};
  const handleConfirmStopClose = () => {};
  const handleConfirmStopSave = () => {};

  let DialogInner;

  switch (dialogActiveType) {
    case EProjectStartStopDialogTypes.PROJECT_START_STOP:
      DialogInner = (
        <ProjectStartStopContent
          onCancel={handleCancelClick}
          onClose={onClose}
          onSubmit={handleSubmit}
          project={project}
          ref={formikRef}
          statusType={statusType}
        />
      );
      break;

    default:
      DialogInner = <TeamRequiredContent onClose={onClose} setDialogActiveType={setDialogActiveType} />;
      break;
  }

  let DialogComponent;

  switch (dialogActiveType) {
    case EProjectStartStopDialogTypes.PROJECT_STOP_CONFIRM:
      DialogComponent = (
        <DialogConfirmStop
          isOpen={modalConfirmStopToggler.value}
          onClickCancelBtn={handleConfirmStopCancel}
          onClickSaveBtn={handleConfirmStopSave}
          onClose={handleConfirmStopClose}
        />
      );
      break;

    default:
      DialogComponent = (
        <Dialog
          childrenWrapperClassName={s.ProjectStartStopDialog__content}
          isOpen
          newDesign
          onClose={onClose}
          title={modalTitle}>
          {DialogInner}
        </Dialog>
      );
      break;
  }

  return DialogComponent;
};
