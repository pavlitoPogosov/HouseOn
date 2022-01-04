import React from 'react';
import { useIntl } from 'react-intl';

import { ReactComponent as PlusThinIcon } from 'assets/icons/plus-thin.svg';
import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { AvatarEditable } from 'common/components/ui/AvatarEditable/AvatarEditable';
import { Input } from 'common/components/ui/Input/Input';
import { NavigationLink } from 'common/components/ui/NavigationLink/NavigationLink';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { MemberSelectDialogContent } from 'routes/chat/_common/MemberSelectDialogContent/MemberSelectDialogContent';
import { MEMBERS, TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

import { ModalTypes } from './types';

import s from './GroupChatDialog.module.scss';

type TGroupChatDialogContent = {
  avatar: string;
  chosenMembers: TeamMemberType[] | null;
  handleAddMemberClick: () => void;
  modalType: ModalTypes;
  name: string;
  selectedMembers: TeamMemberType[];
  setAvatar: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setSelectedMembers: React.Dispatch<React.SetStateAction<TeamMemberType[]>>;
};

export const GroupChatDialogContent = (props: TGroupChatDialogContent): JSX.Element => {
  const {
    avatar,
    chosenMembers,
    handleAddMemberClick,
    modalType,
    name,
    selectedMembers,
    setAvatar,
    setName,
    setSelectedMembers
  } = props;

  const team = MEMBERS;

  const intl = useIntl();

  if (modalType === ModalTypes.ADD_MEMBERS) {
    return (
      <MemberSelectDialogContent
        members={team}
        onlyName
        selectedMembers={selectedMembers}
        setSelectedMembers={setSelectedMembers}
      />
    );
  }

  return (
    <>
      <div className={s.GroupChatDialog__avatar_container}>
        <AvatarEditable
          avatar={avatar}
          containerClassName={s.avatar__container}
          height={146}
          isEditIcon={false}
          onEdit={setAvatar}
          width={146}
          withPhotoPlaceholder
        />
      </div>

      <Input
        defaultValue={name}
        fieldContainerProps={{
          containerClassName: s.GroupChatDialog__inputContainer,
          label: intl.formatMessage({ defaultMessage: 'Name', id: 'chat.dialog.nameLabel' })
        }}
        onChange={(e) => setName(e.target.value)}
        placeholder={intl.formatMessage({ defaultMessage: 'Type name...', id: 'chat.dialog.namePlaceholder' })}
      />

      <div className={s.GroupChatDialog__titleWrapper}>
        <Text
          text={intl.formatMessage({ defaultMessage: 'Members', id: 'chat.dialog.members' })}
          variant={TextPropsVariantsEnum.H3}
        />
      </div>

      <div className={s.GroupChatDialog__avatarsWrapper}>
        <NavigationLink
          as="div"
          className={s.GroupChatDialog__nav_link}
          icon={
            <div className={s.GroupChatDialog__nav_link_icon_wrapper}>
              <PlusThinIcon />
            </div>
          }
          onClick={handleAddMemberClick}
          // text={intl.formatMessage({ defaultMessage: 'Add member', id: 'chat.dialog.addMember' })}
        />

        {chosenMembers?.map((m, i) => (
          <Avatar avatar={m.avatar} containerClassName={s.GroupChatDialog__avatar} height={40} key={i} width={40} />
        ))}
      </div>
    </>
  );
};
