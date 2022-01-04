import { IProject } from 'common/components/ui/_cards/ProjectCard/types';
import { ITask } from 'common/components/ui/_cards/TaskCard/types';

import { EStatusBadgeTypesEnum } from '../../_badges/StatusBadge/StatusBadge';

export const getRightStatusType = (project: IProject | ITask): EStatusBadgeTypesEnum => {
  if (project.pausedTime) return EStatusBadgeTypesEnum.IS_PAUSED;
  if (!project.startTime) return EStatusBadgeTypesEnum.IS_READY_TO_START;

  return EStatusBadgeTypesEnum.IS_ACTIVE;
};
