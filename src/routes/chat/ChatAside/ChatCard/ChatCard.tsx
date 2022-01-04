import React from 'react';
import { useIntl } from 'react-intl';

import clsx from 'clsx';

import { useToggle } from '@proscom/ui-react';
// eslint-disable-next-line
import Tippy from '@tippyjs/react/headless';

import { ReactComponent as EllipsisMenuIcon } from 'assets/icons/ellipsisMenu.svg';
import { CounterBadge } from 'common/components/ui/_badges/CounterBadge/CounterBadge';
import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { AvatarGroup } from 'common/components/ui/AvatarGroup/AvatarGroup';
import { SelectDropdown, ISelectPrimaryOption, SelectDropdownOption } from 'common/components/ui/Select';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { ConfirmDeleteDialogContent } from 'routes/chat/_common/ConfirmDeleteDialogContent/ConfirmDeleteDialogContent';
import { GroupChatDialog } from 'routes/chat/_common/GroupChatDialog/GroupChatDialog';
import { TChatsListItem, TChatData, TChatDataItem, EChatDataTypes } from 'routes/chat/types';

import { isGroupListItem, isPersonalListItem, isSystemListItem } from '../../utils';

import s from './ChatCard.module.scss';

enum MenuTooltipActions {
  DELETE = 'delete',
  EDIT = 'edit'
}

export interface IChatCardProps {
  chat: TChatsListItem;
  containerClassName: string;
  household?: {
    image: string;
    name: string;
  };
  isActive: boolean;
  onClick: () => void;
  onDelete: () => void;
  onEdit: () => void;
  unreadMessagesCount: number;
}

const getLastMessage = (data: TChatData[] | undefined): TChatDataItem | null => {
  if (data) {
    for (let i = data.length; i >= 0; i--) {
      for (let j = data[i]?.content.length; j >= 0; j--) {
        if (data[i].content[j]?.type === EChatDataTypes.MESSAGE) {
          return data[i].content[j];
        }
      }
    }
  }

  return null;
};

export const ChatCard: React.FC<IChatCardProps> = (props) => {
  const { chat, containerClassName, household, isActive, onClick, onDelete, onEdit, unreadMessagesCount } = props;

  const { id, image, name, preview } = chat;

  const isGroup = isGroupListItem(chat);
  const isPersonal = isPersonalListItem(chat);
  const isSystem = isSystemListItem(chat);
  const chatCardMenuTooltipToggler = useToggle();

  const members = isGroup ? chat.members : [];

  const deleteChatModalToggler = useToggle();
  const editGroupChatToggler = useToggle();

  const intl = useIntl();

  const handleMenuClick = (e: React.MouseEvent) => {
    console.log('click');
    e.stopPropagation();
  };

  const handleMenuAction = (selectedAction: ISelectPrimaryOption) => {
    if (selectedAction.value === MenuTooltipActions.DELETE) {
      deleteChatModalToggler.set();
    }

    if (selectedAction.value === MenuTooltipActions.EDIT) {
      editGroupChatToggler.set();
    }
  };

  const deleteOption = !isSystem
    ? {
        text: intl.formatMessage({ defaultMessage: 'Delete', id: 'app.delete' }),
        value: MenuTooltipActions.DELETE
      }
    : undefined;

  const editOption = !isPersonal
    ? {
        text: intl.formatMessage({ defaultMessage: 'Edit', id: 'app.button.edit' }),
        value: MenuTooltipActions.EDIT
      }
    : undefined;

  const MENU_TOOLTIP_OPTIONS = [deleteOption, editOption].filter((o) => o !== undefined) as SelectDropdownOption[];

  const renderMenuTooltip = () => {
    if (deleteChatModalToggler.value || editGroupChatToggler.value) return null;

    return (
      <div className={s.ChatAside__addTooltipWrapper}>
        <SelectDropdown
          containerClassName={s.ChatAside__addTooltip}
          isOpen
          onClickOption={handleMenuAction}
          options={MENU_TOOLTIP_OPTIONS}
        />
      </div>
    );
  };

  const handleDelete = () => {
    onDelete?.();
    deleteChatModalToggler.unset();
  };

  const HouseHoldTooltip = () => (
    <Text className={s.ChatCard__householdTooltip} variant={TextPropsVariantsEnum.CAPTION_R}>
      <div className={s.ChatCard__householdTooltipTriangle} />

      {household?.name}
    </Text>
  );

  return (
    <>
      <article className={clsx(s.ChatCard__container, isActive && s.active, containerClassName)} onClick={onClick}>
        <div className={s.ChatCard__avatarWrapper}>
          <Avatar avatar={image} height={48} width={48} />

          {household && (
            <Tippy content={<HouseHoldTooltip />} offset={[0, -56]}>
              <Avatar avatar={household.image} containerClassName={s.ChatCard__smallAvatar} height={20} width={20} />
            </Tippy>
          )}
        </div>

        <div className={s.ChatCard__content}>
          <div className={s.ChatCard__block}>
            <Text as="div" className={s.ChatCard__title} variant={TextPropsVariantsEnum.BODY_M}>
              <span>{name}</span>

              {unreadMessagesCount > 0 && (
                <CounterBadge
                  className={s.ChatCard__messagesCount}
                  color="green"
                  size="s"
                  text={String(unreadMessagesCount)}
                />
              )}
            </Text>

            {!isSystem && (
              <div
                className={s.ChatCard__menuWrapper}
                // onClick={handleMenuClick}
                onClick={chatCardMenuTooltipToggler.set}
              >
                <Tippy
                  interactive
                  offset={[-28, -100]}
                  onClickOutside={chatCardMenuTooltipToggler.unset}
                  render={renderMenuTooltip}
                  visible={chatCardMenuTooltipToggler.value}
                >
                  <EllipsisMenuIcon className={s.ChatCard__menuIcon} height={22} width={22} />
                </Tippy>
              </div>
            )}
          </div>

          <div className={s.ChatCard__block}>
            {preview && (
              <Text
                as="div"
                className={s.ChatCard__lastMessage}
                color="textSecondary"
                variant={TextPropsVariantsEnum.CAPTION_R}
              >
                <Avatar
                  avatar={preview.author.avatar}
                  containerClassName={s.ChatCard__lastMessageAvatar}
                  height={16}
                  width={16}
                />

                <span>{preview.message}</span>
              </Text>
            )}

            <AvatarGroup
              avatars={members?.map((m) => m.avatar || '').slice(0, 3)}
              className={s.ChatCard__members}
              size={16}
            />
          </div>
        </div>
      </article>

      <ConfirmDeleteDialogContent
        cancelBtnText={intl.formatMessage({ defaultMessage: 'No, don’t remove', id: 'app.dialog.cancelRemove' })}
        isOpen={deleteChatModalToggler.value}
        message={intl.formatMessage(
          {
            defaultMessage: 'Are you sure you want to delete chat “{name}”?',
            id: 'chat.dialog.confirm.remove.text'
          },
          { name: 'Chat name' }
        )}
        onClickCancelBtn={deleteChatModalToggler.unset}
        onClickSaveBtn={handleDelete}
        onClose={deleteChatModalToggler.unset}
        saveBtnText={intl.formatMessage({ defaultMessage: 'Yes, remove', id: 'app.dialog.remove' })}
      />

      <GroupChatDialog chat={chat} isOpen={editGroupChatToggler.value} onClose={editGroupChatToggler.unset} />
    </>
  );
};
