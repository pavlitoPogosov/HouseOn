import React, { useEffect, useRef } from 'react';

import { author5001 } from 'routes/chat/chat-example';
import { TChat, TChatDataItem, EChatDataTypes, TTranslations } from 'routes/chat/types';

import { ChatDialogAction } from './ChatDialogAction/ChatDialogAction';
import { ChatDialogMessage } from './ChatDialogMessage/ChatDialogMessage';
import { EmptyDialog } from './EmptyDialog/EmptyDialog';

import s from './ChatDialog.module.scss';

export interface IChatDialogProps {
  isTouched: boolean;
  selectedChat: TChat;
  translateMessage: (id: number) => Promise<TTranslations>;
  translations: TTranslations | null;
}

type TContentBlock = {
  item: TChatDataItem;
  withUnreadDivider?: boolean;
};

export const ChatDialog: React.FC<IChatDialogProps> = (props) => {
  const { isTouched, selectedChat, translateMessage, translations } = props;

  const currentUserId = author5001.id;
  const isUnread = !!selectedChat.unread;
  const messagesNumber = selectedChat?.data?.content?.length;
  const unreadDividerPosition = isUnread && messagesNumber ? messagesNumber - selectedChat.unread! : 0;

  const bottomDivRef = useRef<HTMLDivElement | null>(null);

  const ContentBlock = (p: TContentBlock) => {
    const { item, withUnreadDivider } = p;

    if (item.type === EChatDataTypes.ACTION) {
      return (
        <ChatDialogAction
          chatAction={item}
          containerClassName={s.ChatDialog__action}
          isTouched={isTouched}
          withUnreadDivider={withUnreadDivider}
        />
      );
    }

    if (item.type === EChatDataTypes.MESSAGE) {
      return (
        <ChatDialogMessage
          chatMessage={item}
          containerClassName={s.ChatDialog__message}
          isFromCurrentUser={item?.author?.id === currentUserId}
          isTouched={isTouched}
          translateMessage={translateMessage}
          translations={translations}
          withUnreadDivider={withUnreadDivider}
        />
      );
    }

    return null;
  };

  const ChatDialogContent = () => {
    if (!selectedChat.data) {
      return <EmptyDialog />;
    }

    return (
      <>
        {selectedChat.data?.content?.map((item, i) => {
          if (isUnread && unreadDividerPosition && i === unreadDividerPosition) {
            return <ContentBlock item={item} key={item.id} withUnreadDivider />;
          }

          return <ContentBlock item={item} key={item.id} />;
        })}
      </>
    );
  };

  useEffect(() => {
    if (bottomDivRef.current) {
      bottomDivRef.current.scrollIntoView();
    }
  }, [selectedChat]);

  return (
    <div className={s.ChatDialog__container}>
      <ChatDialogContent />

      <div ref={bottomDivRef} />
    </div>
  );
};
