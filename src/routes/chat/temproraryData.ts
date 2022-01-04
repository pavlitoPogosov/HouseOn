import moment from 'moment';

// TODO DELETE USELESS IMG
import ImgPlaceholder from 'common/components/ui/_cards/TeamMemberCard/TeamMemberAvatar.png';
import { THorizontalScrollingMenuItem } from 'common/components/ui/HorizontalMenu/HorizontalScrollingMenu/HorizontalScrollingMenu';
import { CHAT_GROUP, CHAT_PERSONAL, CHAT_SYSTEM, author5001 } from 'routes/chat/chat-example';
import { TChat, THouseChatsList, TChatsListItem, TChatMember } from 'routes/chat/types';
import { MEMBERS } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

/* chat members */

export const ALL_MEMBERS: TChatMember[] = [
  {
    avatar: ImgPlaceholder,
    id: 10,
    isAdmin: true,
    isGuest: false,
    name: 'Valencia Danke'
  },
  {
    avatar: ImgPlaceholder,
    id: 1,
    isAdmin: true,
    isGuest: false,
    name: 'Maria Ankerville'
  },
  {
    avatar: ImgPlaceholder,
    id: 2,
    isAdmin: false,
    isGuest: true,
    name: 'Roberto Mielgo'
  },
  {
    avatar: ImgPlaceholder,
    id: 6,
    isAdmin: true,
    isGuest: false,
    name: 'Maria Ankerville'
  },
  {
    avatar: ImgPlaceholder,
    id: 7,
    isAdmin: false,
    isGuest: true,
    name: 'Roberto Mielgo'
  },
  {
    avatar: ImgPlaceholder,
    id: 3,
    isAdmin: false,
    isGuest: true,
    name: 'Anna Antuanetta'
  },
  {
    avatar: ImgPlaceholder,
    id: 4,
    isAdmin: true,
    isGuest: false,
    name: 'Ilbergo Donesuale'
  },
  {
    avatar: ImgPlaceholder,
    id: 9,
    isAdmin: true,
    isGuest: false,
    name: 'Ilbergo Donesuale'
  },
  {
    avatar: ImgPlaceholder,
    id: 5,
    isAdmin: true,
    isGuest: false,
    name: 'Valencia Danke'
  },
  {
    avatar: ImgPlaceholder,
    id: 8,
    isAdmin: false,
    isGuest: true,
    name: 'Anna Antuanetta'
  }
];

export const GROUP_CHAT_MEMBERS = ALL_MEMBERS.slice(0, 6);

/* categories */

export const MAIN_CHAT_CATEGORY: THorizontalScrollingMenuItem = {
  id: '0',
  title: 'All chats'
};

export const CHATS_CATEGORIES: THorizontalScrollingMenuItem[] = [
  MAIN_CHAT_CATEGORY,
  { id: '1', title: 'House 1' },
  { id: '2', title: 'House 2' },
  { id: '3', title: 'House 3' },
  { id: '4', title: 'House 4' },
  { id: '5', title: 'House 5' },
  { id: '6', title: 'House 6' },
  { id: '7', title: 'House 7' }
];

/* house chats list */

export const HOUSE_CHATS_LIST_ITEM_GROUP: TChatsListItem = {
  created: moment(),
  id: 0,
  image: CHAT_GROUP.image,
  members: MEMBERS.slice(0, 6),
  name: 'Group chat name',
  preview: {
    author: author5001,
    message: 'This is the last message preview ...'
  },
  unread: CHAT_GROUP.unread,
  updated: moment()
};

export const HOUSE_CHATS_LIST_ITEM_PERSONAL: TChatsListItem = {
  created: moment(),
  id: 0,
  image: CHAT_PERSONAL.image,
  isPersonal: true,
  name: 'Personal chat name',
  preview: {
    author: author5001,
    message: 'This is the last message preview ...'
  },
  unread: CHAT_PERSONAL.unread,
  updated: moment()
};

export const HOUSE_CHATS_LIST_ITEM_SYSTEM: TChatsListItem = {
  created: moment(),
  id: 0,
  image: CHAT_SYSTEM.image,
  isSystem: true,
  name: 'System chat name',
  preview: {
    author: author5001,
    message: 'This is the last message preview ...'
  },
  unread: CHAT_SYSTEM.unread,
  updated: moment()
};

const generateHouseChatsList = (
  chatTemplate: TChatsListItem,
  number?: number,
  idMultiplier?: number
): TChatsListItem[] =>
  Array(number || 8)
    .fill(null)
    .map((_, i) => ({
      ...chatTemplate,
      created: moment().add(i, 'minutes'),
      id: i + (idMultiplier || 0),
      name: `${chatTemplate.name} ${i + 1}`,
      // unread: i,
      updated: moment()
        .add(i, 'minutes')
        .add(i * 10, 'seconds')
    }));

export const HOUSE_CHATS_LIST: THouseChatsList = {
  group: generateHouseChatsList(HOUSE_CHATS_LIST_ITEM_GROUP, 8, 4001),
  personal: generateHouseChatsList(HOUSE_CHATS_LIST_ITEM_PERSONAL, 8, 4001),
  system: generateHouseChatsList(HOUSE_CHATS_LIST_ITEM_SYSTEM, 8, 4001)
};

/* group chat */

const groupChatsGenerator = (number?: number): TChat[] =>
  Array(number || 8)
    .fill(null)
    .map((_, i) => {
      return {
        ...CHAT_GROUP,
        date: CHAT_GROUP.date.add(i, 'minutes')
        // id: `${Number(CHAT_GROUP.id) + i}`,
        // name: `${CHAT_GROUP.name} ${i}`
      };
    });

export const GROUP_CHATS: TChat[] = groupChatsGenerator();

/* personal chat */

export const personalChatsGenerator = (number?: number): TChat[] =>
  Array(number || 8)
    .fill(null)
    .map((_, i) => {
      return {
        ...CHAT_PERSONAL,
        date: CHAT_PERSONAL.date.add(i, 'minutes')
        // id: `${Number(CHAT_PERSONAL.id) + i}`,
        // name: `${CHAT_PERSONAL.name} ${i}`
      };
    });

export const PERSONAL_CHATS: TChat[] = personalChatsGenerator();

/* system chat */

const systemChatsGenerator = (number?: number): TChat[] =>
  Array(number || 8)
    .fill(null)
    .map((_, i) => {
      return {
        ...CHAT_SYSTEM,
        date: CHAT_SYSTEM.date.add(i, 'minutes')
        // id: `${Number(CHAT_SYSTEM.id) + i}`,
        // name: `${CHAT_PERSONAL.name} ${i}`
      };
    });

export const SYSTEM_CHATS: TChat[] = systemChatsGenerator();

/* chats */
