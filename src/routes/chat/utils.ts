import { EChatListItemTypes, TChat, TChatsListItem } from 'routes/chat/types';

export const isGroup = (chat: TChat): chat is TChat => !!chat.members;

export const isGroupListItem = (chat: TChatsListItem): chat is TChatsListItem => !!chat.members;

export const isPersonal = (chat: TChat): chat is TChat => !!chat.isPersonal;

export const isPersonalListItem = (chat: TChatsListItem): chat is TChatsListItem => !!chat.isPersonal;

export const isSystem = (chat: TChat): chat is TChat => !!chat.isSystem;

export const isSystemListItem = (chat: TChatsListItem): chat is TChatsListItem => !!chat.isSystem;

export const getChatListItemType = (chat: TChatsListItem): EChatListItemTypes | undefined => {
  if (isGroupListItem(chat)) {
    return EChatListItemTypes.GROUP;
  } else if (isPersonalListItem(chat)) {
    return EChatListItemTypes.PERSONAL;
  } else if (isSystemListItem(chat)) {
    return EChatListItemTypes.SYSTEM;
  }
};

export const findSameIdChat = (a: TChat[], b: TChatsListItem) => a.find((c) => c.id === b.id);
