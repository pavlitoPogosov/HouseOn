import React from 'react';
import { useIntl } from 'react-intl';

import clsx from 'clsx';

import { useToggle } from '@proscom/ui-react';
// eslint-disable-next-line
import Tippy from '@tippyjs/react/headless';

import { ReactComponent as ChevronDownIcon } from 'assets/icons/chevronDown.svg';
import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { SelectDropdown, ISelectPrimaryOption } from 'common/components/ui/Select';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useLocale, findLocaleInApp } from 'common/hooks/useLocale';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { TChat } from 'routes/chat/types';
import { TeamMemberType, MEMBERS } from 'routes/houseTeam/HouseTeamViewMembers/tempData';
import { LANGUAGE_SELECT_OPTIONS } from 'variables/languageSelect';

import { isGroup } from '../../utils';

import { MembersDialog } from './MembersDialog/MembersDialog';

import s from './ChatHeader.module.scss';

export interface IChatHeaderProps {
  selectedChat: TChat;
  setSelectedChat: React.Dispatch<React.SetStateAction<TChat | null>>;
  shouldAdapt: boolean;
}

export const ChatHeader: React.FC<IChatHeaderProps> = (props) => {
  const { selectedChat, setSelectedChat, shouldAdapt } = props;

  const { chatsLanguage } = useTypedSelector((store) => store.user);

  const { updateChatsLocale } = useLocale();

  const languageTooltipToggler = useToggle();
  const memberDialogToggler = useToggle();

  const intl = useIntl();

  const handleGoBack = () => {
    setSelectedChat(null);
  };

  const handleChatMembersChange = (members: TeamMemberType[] | null) => {
    setSelectedChat((prev) => {
      if (prev && members) {
        return {
          ...prev,
          members
        };
      }

      return prev;
    });
  };

  const handleLanguageSelect = (newLanguage: ISelectPrimaryOption) => {
    languageTooltipToggler.unset();
    const locale = findLocaleInApp(newLanguage.value);
    updateChatsLocale(locale);
  };

  const renderLanguageTooltip = () => (
    <SelectDropdown
      containerClassName={s.ChatHeader__languageTooltip}
      isOpen
      onClickOption={handleLanguageSelect}
      options={LANGUAGE_SELECT_OPTIONS}
      stopPropogationOnOptionClick
    />
  );

  const isGroupChat = isGroup(selectedChat);

  return (
    <div className={s.ChatHeader__container}>
      <div className={s.ChatHeader__avatarWrapper}>
        {shouldAdapt && (
          <IconCircle
            className={s.ChatHeader__avatarIcon}
            height={32}
            icon={<ChevronLeftIcon />}
            onClick={handleGoBack}
            shadow="l"
            width={32}
          />
        )}

        <Avatar
          avatar={selectedChat.image}
          containerClassName={s.ChatHeader__avatar}
          emptyClassName={s.ChatHeader__emptyAvatar}
          height={48}
          width={48}
        />
      </div>

      <div className={s.ChatHeader__content}>
        <div className={s.ChatHeader__contentHeader}>
          <Text className={s.ChatHeader__name} text={selectedChat.name} variant={TextPropsVariantsEnum.BODY_M} />
        </div>

        <Text variant={TextPropsVariantsEnum.CAPTION_R}>
          <span className={s.ChatHeader__membersLink} onClick={memberDialogToggler.set}>
            {isGroupChat &&
              intl.formatMessage(
                {
                  defaultMessage:
                    '{members, plural, =0 {No members yet}  =1 {{members} member} other {{members} members}}',
                  id: 'chat.header.members'
                },
                { members: selectedChat.members?.length }
              )}
          </span>

          <span className={s.ChatHeader__languageSelect}>
            <span className={s.ChatHeader__dot}>&#8226;</span>

            <Tippy
              interactive
              offset={[-60, -20]}
              onClickOutside={languageTooltipToggler.unset}
              render={renderLanguageTooltip}
              visible={languageTooltipToggler.value}
            >
              <span onClick={languageTooltipToggler.set}>
                {intl.formatMessage(
                  {
                    defaultMessage: 'Translate to {selectedLanguage}',
                    id: 'chat.header.translate'
                  },
                  { selectedLanguage: LANGUAGE_SELECT_OPTIONS.find((lang) => lang.value === chatsLanguage)?.text || '' }
                )}

                <ChevronDownIcon
                  className={clsx(s.ChatHeader__chevronDownIcon, languageTooltipToggler.value && s.rotate)}
                />
              </span>
            </Tippy>
          </span>
        </Text>
      </div>

      <MembersDialog
        allMembers={MEMBERS}
        isOpen={memberDialogToggler.value}
        onChange={handleChatMembersChange}
        onClose={memberDialogToggler.unset}
        selectedChat={selectedChat}
      />
    </div>
  );
};
