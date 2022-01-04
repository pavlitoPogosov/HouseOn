/*
 * Данный файл временный и используется для более удобного отображения описания объекта чата
 * TODO: удалить после разработки данных для перевода чатов на бэке
 */

/* eslint-disable */

import { Moment } from 'moment';
import { TChatFile } from 'routes/chat/types';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

/*
 * ****************************
 * Объект чата
 * ****************************
 */
type TChatType = {
  chatHouseHold: {
    image: string;
    name: string;
  };
  creator: {
    id: number;
  };
  data: {
    content: TChatDataItem[];
    date: Moment;
    translations: {
      [language in EChatLanguagesTypes]?: TTranslationItem[];
    };
  };
  date: Moment;
  id: number;
  image: string;
  isGroup?: boolean;
  isPersonal?: boolean;
  isSystem?: boolean;
  members?: ITeamMemberType[];
  name: string;
  unread?: number;
};

/*
 * ****************************
 * Составляющие объекта чата
 * ****************************
 */

enum EColors {
  BACKGROUND_DAY_TETRIARY = '#f3f5f8',
  BLACK = '#000000',
  BLUE200 = '#43A6CF',
  GREEN200 = '#7EBF2F',
  GREY100 = '#ededf8',
  GREY200 = '#D2D3D4',
  GREY25 = '#BEBFC9',
  GREY50 = '#E6E6E6',
  ORANGE100 = '#FDEEE8',
  ORANGE200 = '#F3A282',
  RED200 = '#EE505A',
  TEXT_SECONDARY = '#646a8c',
  TRANSPARENT = 'transparent',
  WHITE = '#ffffff',
  YELLOW200 = '#ebfe6d'
}

interface ITeamMemberType {
  activeProjects: number;
  avatar: string | null;
  citizenShip: string;
  containerClassName?: string;
  email: string;
  files: string[];
  id: number;
  isActive?: boolean;
  isAdmin?: boolean;
  isArchived: boolean;
  isGuest?: boolean;
  isInvited: boolean;
  isOnline: boolean;
  isPendingToRespond?: boolean;
  name: string;
  onClick?: () => void;
  onlineStatusClassName?: string;
  onlineStatusColor?: EColors;
  onlineStatusContainerClassName?: string;
  onlineStatusDotSize?: number;
  onlyName?: boolean;
  payment: number;
  paymentFormat: 'h' | 'm';
  phone: string;
  rate: number;
  residence: string;
  reward?: number;
  role: string;
}

enum EChatLanguagesTypes {
  DE = 'de',
  EN = 'en',
  ES = 'es',
  FR = 'fr',
  IT = 'it',
  RU = 'ru',
  SP = 'sp'
}

enum EChatFileTypes {
  DOC = 'DOC',
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

enum EChatDataTypes {
  ACTION = 'ACTION',
  MESSAGE = 'MESSAGE'
}

/*
 * На данный момент от объекта перевода (TTranslationItem) нам необходимы
 * только поля id и text для сопостовления с оригинальным сообщением в чате
 */
type TTranslationItem = {
  id: number;
  text: string;
  updated: Moment;
};

type TChatDataItem = {
  author?: TeamMemberType;
  date: Moment;
  files?: TChatFile[];
  id: number;
  text?: string;
  type: EChatDataTypes;
};

/* eslint-enable */
