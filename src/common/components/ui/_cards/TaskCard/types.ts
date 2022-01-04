import { Moment } from 'moment';

import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

export interface ITask {
  author: TeamMemberType | null;
  changedTime: Moment | null;
  comment: string | null;
  endTime: Moment | null;
  id: string;
  img: string | null;
  members?: TeamMemberType[];
  pausedTime: Moment | null;
  startTime: Moment | null;
  title: string;
}
