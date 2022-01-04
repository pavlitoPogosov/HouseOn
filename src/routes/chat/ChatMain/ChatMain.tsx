import React, { useState } from 'react';

import {
  TChat,
  TTranslations,
} from 'routes/chat/types';

import { ChatDialog } from './ChatDialog/ChatDialog';
import { ChatHeader } from './ChatHeader/ChatHeader';
import { ChatInput } from './ChatInput/ChatInput';
import { EmptyMessage } from './EmptyMessage/EmptyMessage';

import s from './ChatMain.module.scss';

export interface IChatMainProps {
  selectedChat: TChat | null;
  setSelectedChat: React.Dispatch<React.SetStateAction<TChat | null>>;
  shouldAdapt: boolean;
  translateMessage: (id: number) => Promise<TTranslations>;
  translations: TTranslations | null;
}

const ChatMainContent = (props: IChatMainProps) => {
  const {
    selectedChat,
    setSelectedChat,
    shouldAdapt,
    translateMessage,
    translations,
  } = props;

  const [ isTouched, setTouched ] = useState(false);

  const handleSetTouched = () => {
    if (!isTouched) {
      setTouched(true);
    }
  };

  if (!selectedChat) {
    return <EmptyMessage />;
  }

  return (
    <div className={s.ChatMain__content}>
      {
        selectedChat && (
          <ChatHeader
            selectedChat={selectedChat}
            setSelectedChat={setSelectedChat}
            shouldAdapt={shouldAdapt}
          />
        )
      }

      <ChatDialog
        isTouched={isTouched}
        selectedChat={selectedChat}
        translateMessage={translateMessage}
        translations={translations}
      />

      <ChatInput
        selectedChat={selectedChat}
        setSelectedChat={setSelectedChat}
        setTouched={handleSetTouched}
      />
    </div>
  );
};

export const ChatMain: React.FC<IChatMainProps> = props => {
  return (
    <div className={s.ChatMain__container}>
      <ChatMainContent {...props} />
    </div>
  );
};
