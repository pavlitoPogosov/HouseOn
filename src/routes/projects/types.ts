import { Moment } from 'moment';

import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

export enum EHouseDataFileExtensions {
  WORD = 'word'
}

export enum EHouseDataFileTags {
  CHECKS = 'checks',
  CLOTHES = 'clothes'
}

export type THouseDataFile = {
  addedTime: Moment | null;
  coOwners: TeamMemberType[];
  comment: string | null;
  expireTime: Moment | null;
  extension: EHouseDataFileExtensions;
  id: string;
  img: string;
  issueTime: Moment | null;
  owner: TeamMemberType;
  tags: EHouseDataFileTags[];
  title: string;
};

export type TFileItem = {
  category: string;
  created: Moment;
  files: THouseDataFile[];
  id: string;
  isDownloaded?: boolean;
  recommended?: THouseDataFile[];
};
