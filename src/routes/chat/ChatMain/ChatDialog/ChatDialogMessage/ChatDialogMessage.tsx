import React, { useState, useEffect, useMemo } from 'react';

import clsx from 'clsx';
import moment from 'moment';

import { useToggle } from '@proscom/ui-react';
// eslint-disable-next-line
import Tippy from '@tippyjs/react/headless';

import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { IconButton } from 'common/components/ui/IconButton/IconButton';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { DividerUnread } from 'routes/chat/ChatMain/_common/DividerUnread/DividerUnread';
import { TChatDataItem, EChatLanguagesTypes, TTranslations } from 'routes/chat/types';

import { DownloadedFileCard } from '../../_common/DownloadedFileCard/DownloadedFileCard';

import { ReactComponent as TranslateIcon } from './translate.svg';

import s from './ChatDialogMessage.module.scss';

export interface IChatDialogMessageProps {
  chatMessage: TChatDataItem;
  containerClassName: string;
  isFromCurrentUser: boolean;
  isTouched: boolean;
  translateMessage: (id: number) => Promise<TTranslations>;
  translations: TTranslations | null;
  withUnreadDivider?: boolean;
}

type TTranslation = {
  lang: EChatLanguagesTypes;
  text: string | null;
};

export const ChatDialogMessage: React.FC<IChatDialogMessageProps> = (props) => {
  const {
    chatMessage,
    containerClassName,
    isFromCurrentUser,
    isTouched,
    translateMessage,
    translations,
    withUnreadDivider
  } = props;

  const { chatsLanguage } = useTypedSelector((s) => s.user);

  const { author, date, files, id, text, type } = chatMessage;

  const selectedToggler = useToggle();

  const [translation, setTranslation] = useState<TTranslation | null>(null);

  const findTranslation = (tr: TTranslations) => tr?.[chatsLanguage]?.find?.((t) => t.id === chatMessage.id);

  const updateTranslation = () =>
    translateMessage(id)
      .then((res) => {
        const tr = findTranslation(res);
        setTranslation({
          lang: chatsLanguage,
          text: tr?.text || null
        });
      })
      .catch();

  useEffect(() => {
    if (selectedToggler.value) {
      if (translations) {
        const tr = findTranslation(translations);

        if (!translation) {
          if (tr) {
            setTranslation({
              lang: chatsLanguage,
              text: tr.text
            });
          } else {
            updateTranslation();
          }
        }
      } else if (translation?.lang !== chatsLanguage) {
        updateTranslation();
      }
    }
  }, [selectedToggler.value, chatsLanguage]);

  const renderMessageTooltip = () => (
    <div className={s.ChatDialogMessage__messageTooltip}>
      <div className={s.ChatDialogMessage__messageTooltipTriangle} />
      Show translation
    </div>
  );

  const isFiles = !!files?.length;

  const messageText = useMemo(
    () => (selectedToggler.value && translation ? translation.text : text),
    [selectedToggler, translation, text]
  );

  return (
    <>
      {withUnreadDivider && <DividerUnread isTouched={isTouched} />}

      <div
        className={clsx(
          s.ChatDialogMessage__container,
          isFromCurrentUser && s.current_user,
          containerClassName,
          isFiles && !text && s.only_files
        )}>
        <Avatar avatar={author?.avatar} containerClassName={s.ChatDialogMessage__avatar} height={40} width={40} />

        <div
          className={clsx(
            s.ChatDialogMessage__inner,
            isFiles && !text && s.only_files,
            isFromCurrentUser && s.current_user
          )}>
          <div className={clsx(s.ChatDialogMessage__text_block, isFromCurrentUser && s.current_user)}>
            {text && (
              <div className={clsx(s.ChatDialogMessage__message, isFromCurrentUser && s.current_user)}>
                <Text
                  as="div"
                  className={s.ChatDialogMessage__messageText}
                  text={messageText!}
                  variant={TextPropsVariantsEnum.CAPTION_R}
                />

                {moment(date).isValid() && (
                  <Text
                    as="div"
                    className={clsx(s.ChatDialogMessage__messageTime, isFromCurrentUser && s.current_user)}
                    color="textSecondary"
                    text={moment(date).format('h:mma')}
                    variant={TextPropsVariantsEnum.CAPTION_R}
                  />
                )}
              </div>
            )}

            {text && (
              <Tippy delay={[400, 0]} offset={[0, -60]} render={renderMessageTooltip}>
                <IconButton
                  className={s.ChatDialogMessage__translateIcon}
                  height={22}
                  icon={<TranslateIcon />}
                  isSelected={selectedToggler.value}
                  onClick={selectedToggler.toggle}
                  width={22}
                />
              </Tippy>
            )}
          </div>

          {isFiles && (
            <div
              className={clsx(s.ChatDialogMessage__files, isFromCurrentUser && s.current_user, !text && s.only_files)}>
              {files.map((f, i) => {
                const fileId = f instanceof File ? i : f.id;

                return (
                  <DownloadedFileCard
                    containerClassName={s.ChatDialogMessage__file}
                    file={f}
                    id={fileId}
                    isFromCurrentUser={isFromCurrentUser}
                    key={fileId}
                    messageAuthor={chatMessage.author?.name}
                    messageDate={chatMessage.date}
                    withTime={!text}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};
