import { ITask } from 'common/components/ui/_cards/TaskCard/types';
import { EProjectStartedContentFields } from 'routes/projects/singleProject/ProjectStartStopDialog/types';

export const createTaskFieldName = (task: ITask) => `${EProjectStartedContentFields.TASK}-${task.id}`;
