import moment from 'moment';

import { IProject } from 'common/components/ui/_cards/ProjectCard/types';
import { ITask } from 'common/components/ui/_cards/TaskCard/types';
import { MEMBERS } from 'routes/houseTeam/HouseTeamViewMembers/tempData';
import { THouseDataFile, EHouseDataFileExtensions, EHouseDataFileTags, TFileItem } from 'routes/projects/types';

/* ---- TASKS ---- */

export const tasksGenerator = (n?: number, author?: number): ITask[] =>
  Array(n || 8)
    .fill(null)
    .map((_, i) => {
      return {
        author: MEMBERS[author || 0],
        changedTime: null,
        comment: '',
        endTime: moment('24.09.21', 'DD.MM.YY'),
        id: String(1300 + i),
        img: '',
        members: [MEMBERS[0]],
        pausedTime: null,
        startTime: moment('23.09.21', 'DD.MM.YY'),
        tasks: [],
        title: 'Care of wardrobe items'
      };
    });

export const TASKS_BY_ME: ITask[] = tasksGenerator(8, 1);
export const TASKS_BY_OTHER: ITask[] = tasksGenerator(8, 2);

/* ---- PROJECT_MEMBERS---- */

const PROJECT_MEMBERS = MEMBERS.slice(0, 4);

/* ---- PROJECTS QUICK ---- */

export const projectsQuickGenerator = (n?: number): IProject[] =>
  Array(n || 8)
    .fill(null)
    .map((_, i) => {
      return {
        author: MEMBERS[i] || MEMBERS[0],
        changedTime: null,
        comment: '',
        endTime: moment('24.09.21', 'DD.MM.YY'),
        id: String(1100 + i),
        img: '',
        isQuick: true,
        members: [MEMBERS[0]],
        pausedTime: null,
        startTime: moment('23.09.21', 'DD.MM.YY'),
        tasks: [],
        title: 'Project Card Title'
      };
    });

export const PROJECTS_QUICK: IProject[] = projectsQuickGenerator(8);

/* ---- PROJECTS ---- */

export const projectsGenerator = (n?: number): IProject[] =>
  Array(n || 8)
    .fill(null)
    .map((_, i) => {
      return {
        author: MEMBERS[i] || MEMBERS[0],
        changedTime: null,
        comment: '',
        endTime: null,
        id: String(1200 + i),
        img: '',
        isQuick: false,
        members: [MEMBERS[0]],
        // members: [],
        pausedTime: null,
        startTime: moment(),
        tasks: TASKS_BY_OTHER,
        title: 'Project Title'
      };
    });

export const PROJECTS: IProject[] = projectsGenerator(8);

/* ---- HOUSE DATA FILES ---- */

export const houseDataFilesGenerator = (n?: number): THouseDataFile[] =>
  Array(n || 8)
    .fill(null)
    .map((_, i) => {
      return {
        addedTime: moment().subtract(1, 'days'),
        coOwners: [MEMBERS[1], MEMBERS[2]],
        comment: null,
        expireTime: moment().add(1, 'year'),
        extension: EHouseDataFileExtensions.WORD,
        id: String(1400 + i),
        img: '',
        issueTime: moment().subtract(1, 'year'),
        owner: MEMBERS[0],
        tags: [EHouseDataFileTags.CHECKS, EHouseDataFileTags.CLOTHES],
        title: 'Passports and certificates for expensive wardrobe items and jewelry'
      };
    });

export const FILES: THouseDataFile[] = houseDataFilesGenerator(3);

export const HOUSE_DATA_FILES: TFileItem[] = [
  {
    category: 'Pets',
    created: moment().subtract(1, 'days'),
    files: FILES,
    id: '2001',
    isDownloaded: true,
    recommended: FILES
  },
  {
    category: 'Wardrobe',
    created: moment().subtract(3, 'days'),
    files: FILES,
    id: '2002',
    isDownloaded: false,
    recommended: []
  },
  {
    category: 'First aid kit',
    created: moment().subtract(5, 'days'),
    files: FILES,
    id: '2003',
    isDownloaded: false,
    recommended: []
  }
];
