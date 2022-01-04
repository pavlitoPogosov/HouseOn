import React, { useMemo } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useIntl } from 'react-intl';

import { useToggle } from '@proscom/ui-react';
// eslint-disable-next-line
import Tippy from '@tippyjs/react/headless';

import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';
import { Button } from 'common/components/ui/Button/Button';
import {
  HorizontalScrollingMenu,
  THorizontalScrollingMenuItem
} from 'common/components/ui/HorizontalMenu/HorizontalScrollingMenu/HorizontalScrollingMenu';
import { SearchInput } from 'common/components/ui/SearchInput/SearchInput';
import { SelectDropdown, ISelectPrimaryOption } from 'common/components/ui/Select';
import { UsualTabs, IUsualTab } from 'common/components/ui/Tabs';
import { useInput } from 'common/hooks/useInput';
import {
  GROUP_CHATS,
  HOUSE_CHATS_LIST_ITEM_GROUP,
  HOUSE_CHATS_LIST_ITEM_PERSONAL,
  PERSONAL_CHATS
} from 'routes/chat/temproraryData';
import { TAsideChats, TChat, THouseChatsList, TChatsListItem, EModalTypes, ESortTypes } from 'routes/chat/types';
import { MEMBERS, TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';
import { normalizeString } from 'utils/stringUtils';

import { GroupChatDialog, TGroupChatDialogOnClose } from '../_common/GroupChatDialog/GroupChatDialog';
import { getChatListItemType } from '../utils';

import { ChatCard } from './ChatCard/ChatCard';
import { PersonalChatDialog } from './PersonalChatDialog/PersonalChatDialog';

import s from './ChatAside.module.scss';

export interface IChatAsideProps {
  activeTab: string;
  chats: THouseChatsList | null;
  house: string | null;
  houses: THorizontalScrollingMenuItem[];
  selectedChat: TChatsListItem | null;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  setChat: React.Dispatch<React.SetStateAction<TChat | null>>;
  setChats: React.Dispatch<React.SetStateAction<THouseChatsList | null>>;
  setHouse: React.Dispatch<React.SetStateAction<string | null>>;
  setSelectedChat: React.Dispatch<React.SetStateAction<TChatsListItem | null>>;
  shouldAdapt: boolean;
  tabs: IUsualTab[];
}

export const ChatAside: React.FC<IChatAsideProps> = (props) => {
  const {
    activeTab,
    chats,
    house,
    houses,
    selectedChat,
    setActiveTab,
    setChat,
    setChats,
    setHouse,
    setSelectedChat,
    shouldAdapt,
    tabs
  } = props;

  const intl = useIntl();

  const ADD_TOOLTIP_OPTIONS: ISelectPrimaryOption[] = [
    {
      text: intl.formatMessage({ defaultMessage: 'Group chat', id: 'chat.aside.sort.groupChat' }),
      value: EModalTypes.NEW_GROUP_CHAT
    },
    {
      text: intl.formatMessage({ defaultMessage: 'Personal chat', id: 'chat.aside.sort.personalChat' }),
      value: EModalTypes.NEW_PERSONAL_CHAT
    }
  ];

  const [searchValue, handleSearchChange] = useInput();

  const addTooltipToggler = useToggle();
  const personChatDialogToggler = useToggle();
  const groupChatDialogToggler = useToggle();

  const currentChats: TAsideChats =
    useMemo(() => {
      const personalChats = chats?.personal || [];
      const systemChats = chats?.system || [];

      const currChats = activeTab === ESortTypes.GROUP_CHATS ? chats?.group : [...personalChats, ...systemChats];

      if (searchValue) {
        return (currChats as [])?.filter?.((c: TChatsListItem) =>
          normalizeString(c.name).includes(normalizeString(searchValue))
        );
      }

      return currChats;
    }, [activeTab, selectedChat, searchValue, chats]) || [];

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const handleChatSelect = (newSelectedChat: TChatsListItem | null) => {
    const isSelected = selectedChat?.id === newSelectedChat?.id;
    if (!isSelected) {
      setSelectedChat(newSelectedChat);
    }
  };

  const handleChatEdit = (chatEdited: TChatsListItem | null) => {
    /* TODO: подключить graphql */

    setSelectedChat(chatEdited);
  };

  const handleChatDelete = (chatDeleted: TChatsListItem | null) => {
    /* TODO: подключить graphql */

    const isSelected = selectedChat?.id === chatDeleted?.id;

    if (chatDeleted && chats) {
      const chatType = getChatListItemType(chatDeleted);

      if (chatType) {
        const newChats = {
          ...chats,
          [chatType]: (chats[chatType] as [])?.filter((c: TChat) => c.id !== chatDeleted.id)
        };

        if (isSelected) {
          setSelectedChat(null);
          setChat(null);
        }

        setChats(newChats);
      }
    }
  };

  const handleOptionClick = (option: ISelectPrimaryOption) => {
    if (option.value === EModalTypes.NEW_GROUP_CHAT) {
      groupChatDialogToggler.set();
      addTooltipToggler.unset();
    }

    if (option.value === EModalTypes.NEW_PERSONAL_CHAT) {
      personChatDialogToggler.set();
      addTooltipToggler.unset();
    }
  };

  const renderAddTooltip = () => (
    <SelectDropdown
      containerClassName={s.ChatAside__addTooltip}
      isOpen
      onClickOption={handleOptionClick}
      options={ADD_TOOLTIP_OPTIONS}
      stopPropogationOnOptionClick
    />
  );

  const handleClosePersonalChatDialog = (member: TeamMemberType | null) => {
    personChatDialogToggler.unset();

    const newChat = PERSONAL_CHATS[0];

    const newChatListItem = HOUSE_CHATS_LIST_ITEM_PERSONAL;

    if (chats) {
      const newChats = {
        ...chats,
        personal: [...chats.personal, newChat]
      };

      setSelectedChat(newChatListItem);
      setChat(newChat);
      setChats(newChats as any);
    }
  };

  const handleCloseGroupChatDialog = (data: TGroupChatDialogOnClose) => {
    groupChatDialogToggler.unset();

    const newChat = GROUP_CHATS[0];

    const newChatListItem = HOUSE_CHATS_LIST_ITEM_GROUP;

    if (chats) {
      const newChats = {
        ...chats,
        group: [...chats.group, newChat]
      };

      setSelectedChat(newChatListItem);
      setChat(newChat);
      setChats(newChats as any);
    }
  };

  const team = MEMBERS;

  return (
    <>
      <div className={s.ChatAside__horizontal_menu_container}>
        <HorizontalScrollingMenu items={houses} onSelect={(id) => setHouse(id)} selected={house} />
      </div>

      <SearchInput
        containerClassName={s.ChatAside__search_container}
        inputClassName={s.ChatAside__search_input}
        onChange={handleSearchChange}
        value={searchValue}
      />

      <div className={s.ChatAside__controls}>
        <UsualTabs
          containerClassName={s.ChatAside__tabs_container}
          onChange={handleTabChange}
          tabClassName={s.ChatAside__tab}
          tabs={tabs}
          value={activeTab}
        />

        <Tippy
          interactive
          offset={[-65, -35]}
          onClickOutside={addTooltipToggler.unset}
          render={renderAddTooltip}
          visible={addTooltipToggler.value}
        >
          <Button
            className={s.ChatAside__btn_add}
            color="orange"
            onClick={addTooltipToggler.set}
            rightIcon={<ChevronDownIcon height={18} width={18} />}
            size="s"
            variant="secondary"
          >
            Add
          </Button>
        </Tippy>
      </div>

      <div className={s.ChatAside__chatsWrapper}>
        <Scrollbars>
          {currentChats?.map((chat) => (
            <ChatCard
              chat={chat}
              containerClassName={s.ChatAside__chatCard}
              isActive={selectedChat?.id === chat.id}
              key={Math.floor(new Date().valueOf() * Math.random())}
              onClick={() => handleChatSelect(chat)}
              onDelete={() => handleChatDelete(chat)}
              onEdit={() => handleChatEdit(chat)}
              unreadMessagesCount={chat.unread || 0}
            />
          ))}
        </Scrollbars>
      </div>

      <PersonalChatDialog
        isOpen={personChatDialogToggler.value}
        members={team || []}
        onBack={personChatDialogToggler.unset}
        onClose={personChatDialogToggler.unset}
        setSelectedTeamMember={handleClosePersonalChatDialog}
      />

      <GroupChatDialog isOpen={groupChatDialogToggler.value} onClose={handleCloseGroupChatDialog} />
    </>
  );
};
