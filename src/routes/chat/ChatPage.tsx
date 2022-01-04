import React, { useEffect, useState, useMemo } from 'react';
import { useIntl } from 'react-intl';

import moment from 'moment';

import { delayPromise } from '@proscom/ui-utils';
import { IUsualTab } from 'common/components/ui/Tabs';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { AsideLayoutLeft } from 'routes/_layouts/AsideLayoutLeft/AsideLayoutLeft';
import {
  TChat,
  THouseChatsList,
  TChatsListItem,
  EChatLanguagesTypes,
  TTranslations,
  ESortTypes
} from 'routes/chat/types';

import { ChatAside } from './ChatAside/ChatAside';
import { ChatMain } from './ChatMain/ChatMain';
import { CHATS_CATEGORIES, GROUP_CHATS, HOUSE_CHATS_LIST, PERSONAL_CHATS, SYSTEM_CHATS } from './temproraryData';
import { findSameIdChat, isGroupListItem, isPersonalListItem, isSystemListItem } from './utils';

import s from './ChatPage.module.scss';

export const ChatPage: React.FC<unknown> = () => {
  const houses = CHATS_CATEGORIES;

  const intl = useIntl();

  const TABS: IUsualTab[] = [
    {
      text: intl.formatMessage({ defaultMessage: 'Groups', id: 'chat.aside.sort.group' }),
      value: ESortTypes.GROUP_CHATS
    },
    {
      text: intl.formatMessage({ defaultMessage: 'Personal chat', id: 'chat.aside.sort.personalChat' }),
      value: ESortTypes.PERSONAL_CHATS
    }
  ];

  const [selectedChat, setSelectedChat] = useState<TChatsListItem | null>(null);
  const [translations, setTranslations] = useState<TTranslations | null>(null);
  const [chats, setChats] = useState<THouseChatsList | null>(null);
  const [chat, setChat] = useState<TChat | null>(null);
  const [house, setHouse] = useState<string | null>(houses?.[0]?.id);
  const [activeTab, setActiveTab] = useState(TABS[1].value);

  const { chatsLanguage } = useTypedSelector((store) => store.user);

  const isTablet = useMediaQuery('(max-width: 997px)');
  const shouldAdapt = useMediaQuery('(max-width: 968px)');

  const translateMessage = async (id: number): Promise<TTranslations> => {
    const newTranslation = {
      id,
      text:
        chatsLanguage === EChatLanguagesTypes.DE
          ? 'Dit is een tijdelijk vertaalbericht'
          : 'This is temporary translation message',
      updated: moment()
    };

    await delayPromise(25);

    return {
      ...translations,
      [chatsLanguage]: [...(translations?.[chatsLanguage] || []), newTranslation]
    };
  };

  const updateChat = (c: TChat[], sc: TChatsListItem) => {
    const newChat = findSameIdChat(c, sc);

    if (newChat) {
      // fake fetch
      delayPromise(25).then(() => {
        setChat(newChat);
        setTranslations(newChat.data.translations);
      });
    }
  };

  const updateTab = (val: string) => {
    if (activeTab !== val) {
      setActiveTab(val);
    }
  };

  useEffect(() => {
    if (selectedChat) {
      /* TODO: replace to real data */
      if (isGroupListItem(selectedChat)) {
        updateChat(GROUP_CHATS, selectedChat);
        updateTab(TABS[0].value);
      } else if (isPersonalListItem(selectedChat)) {
        updateChat(PERSONAL_CHATS, selectedChat);
        updateTab(TABS[1].value);
      } else if (isSystemListItem(selectedChat)) {
        updateChat(SYSTEM_CHATS, selectedChat);
        updateTab(TABS[1].value);
      }
    } else if (translations) {
      setTranslations(null);
    }
  }, [selectedChat]);

  useEffect(() => {
    if (typeof house === 'string') {
      delayPromise(25).then(() => setChats(HOUSE_CHATS_LIST));
      setSelectedChat(null);
    }
  }, [house]);

  useEffect(() => {
    if (chat && !selectedChat) {
      const personalChats = chats?.personal || [];
      const systemChats = chats?.system || [];
      const groupChats = chats?.group || [];
      const allChats = [...groupChats, ...personalChats, ...systemChats];
      const currentChat = allChats.find((c) => c.id === chat.id);
      setSelectedChat(currentChat || null);
    }
  }, [house]);

  const asideCmp = (
    <ChatAside
      activeTab={activeTab}
      chats={chats}
      house={house}
      houses={houses}
      selectedChat={selectedChat}
      setActiveTab={setActiveTab}
      setChat={setChat}
      setChats={setChats}
      setHouse={setHouse}
      setSelectedChat={setSelectedChat}
      shouldAdapt={shouldAdapt}
      tabs={TABS}
    />
  );

  const mainCmp = (
    <ChatMain
      selectedChat={chat}
      setSelectedChat={setChat}
      shouldAdapt={shouldAdapt}
      translateMessage={translateMessage}
      translations={translations}
    />
  );

  const CmpSelectedChat = useMemo(() => (selectedChat ? mainCmp : asideCmp), [selectedChat, chats]);

  useEffect(() => {
    // fake fetch
    delayPromise(25).then(() => setChats(HOUSE_CHATS_LIST));
  }, []);

  return (
    <AsideLayoutLeft
      asideClassName={s.ChatPage__aside}
      asideCmp={asideCmp}
      contentClassName={s.ChatPage__aside_content}
      isHouseSelectHidden
      isSearchHidden
      logoClassName={s.ChatPage__aside_logo}
      mainClassName={s.ChatPage__aside_main}
      mainCmp={isTablet ? CmpSelectedChat : mainCmp}
      mobileQuery="(max-width: 997px)"
      sidebarQuery="(max-width: 1199px)"
    />
  );
};
