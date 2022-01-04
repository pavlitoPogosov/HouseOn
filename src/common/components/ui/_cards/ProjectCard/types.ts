import { Moment } from 'moment';

import { ITask } from 'common/components/ui/_cards/TaskCard/types';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

export interface IProject {
  author: TeamMemberType | null;
  changedTime: Moment | null;
  comment: string | null;
  endTime: Moment | null;
  id: string;
  img: string | null;
  isQuick: boolean;
  members?: TeamMemberType[];
  pausedTime: Moment | null;
  startTime: Moment | null;
  tasks: ITask[];
  title: string;
}
