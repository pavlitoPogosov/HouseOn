export enum EProjectStartStopDialogTypes {
  TEAM_REQUIRED = 0,
  PROJECT_START_STOP = 1,
  PROJECT_STOP_CONFIRM = 2
}

export enum EProjectStartedContentFields {
  ALL_TASKS = 'all_tasks',
  MEMBER = 'member',
  TASK = 'task'
}

export type TProjectStartedDielogForm = {
  [field in EProjectStartedContentFields]: any;
};
