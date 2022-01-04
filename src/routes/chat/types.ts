import { Moment } from 'moment';

import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';
import { LANGUAGE_SELECT_OPTIONS } from 'variables/languageSelect';
import { EMediaTypes } from 'variables/media';

/* types */

export enum ESortTypes {
  GROUP_CHATS = 'GROUP_CHATS',
  PERSONAL_CHATS = 'PERSONAL_CHATS'
}

export enum EModalTypes {
  NEW_GROUP_CHAT = 'chat',
  NEW_PERSONAL_CHAT = 'personal chat'
}

export enum EChatDataTypes {
  ACTION = 'ACTION',
  MESSAGE = 'MESSAGE'
}

export enum EChatListItemTypes {
  GROUP = 'group',
  PERSONAL = 'personal',
  SYSTEM = 'system'
}

export enum EChatLanguagesTypes {
  DE = 'de',
  EN = 'en',
  ES = 'es',
  FR = 'fr',
  IT = 'it',
  RU = 'ru',
  SP = 'sp'
}

export enum EChatLanguagesShort {
  DE = 'DE',
  EN = 'EN',
  ES = 'ES',
  FR = 'FR',
  IT = 'IT',
  RU = 'RU',
  SP = 'SP'
}

export enum EChatLanguagesFull {
  DE = 'German',
  EN = 'English',
  ES = 'Portuguese',
  FR = 'French',
  IT = 'Italian',
  RU = 'Russian',
  SP = 'Spanish'
}

export type TChatLanguages = typeof LANGUAGE_SELECT_OPTIONS[number];

/* common */

export type TChatFileLink = {
  id: number;
  link: string;
  type: EMediaTypes;
};

export type TChatFile = File | TChatFileLink;

/* household */

export type TChatHouseHold = {
  image: string;
  name: string;
};

/* data item */

export type TChatDataItem = {
  author?: TeamMemberType;
  date: Moment;
  files?: TChatFile[];
  id: number;
  text?: string;
  type: EChatDataTypes;
};

/* translations */

export type TTranslationItem = {
  id: number;
  text: string;
  updated: Moment;
};

export type TTranslations = {
  [language in EChatLanguagesTypes]?: TTranslationItem[];
};

/* data */

export type TChatData = {
  content: TChatDataItem[];
  date: Moment;
  translations: TTranslations;
};

/* member */

export type TChatMember = {
  avatar: string;
  id: number;
  isAdmin?: boolean;
  isGuest?: boolean;
  name: string;
};

/* preview */

export type TChatPreview = {
  author: TeamMemberType;
  message: string;
} | null;

/* list item */

export type TChatsListItem = {
  created: Moment;
  id: number;
  image: string;
  isGroup?: boolean;
  isPersonal?: boolean;
  isSystem?: boolean;
  members?: TeamMemberType[];
  name: string;
  preview: TChatPreview;
  unread?: number;
  updated: Moment;
};

/* list */

export type THouseChatsList = {
  group: TChatsListItem[];
  personal: TChatsListItem[];
  system: TChatsListItem[];
};

/* chat */

export type TChat = {
  chatHouseHold: TChatHouseHold;
  creator: {
    id: number;
  };
  data: TChatData;
  date: Moment;
  id: number;
  image: string;
  isGroup?: boolean;
  isPersonal?: boolean;
  isSystem?: boolean;
  members?: TeamMemberType[];
  name: string;
  unread?: number;
};

/* aside */

export type TAsideChats = TChatsListItem[] | undefined;
