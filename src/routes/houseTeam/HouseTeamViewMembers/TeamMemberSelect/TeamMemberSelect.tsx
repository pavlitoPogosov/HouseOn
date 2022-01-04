import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import clsx from 'clsx';

import { useToggle } from '@proscom/ui-react';
import { TeamMemberCard } from 'common/components/ui/_cards/TeamMemberCard/TeamMemberCard';
import { CreatedEntityLinkDialogContent } from 'common/components/ui/_dialogs/CreatedEntityLinkDialogContent/CreatedEntityLinkDialogContent';
import { TeamMemberCardSkeleton } from 'common/components/ui/_skeletons/TeamMemberCardSkeleton/TeamMemberCardSkeleton';
import { ButtonLink } from 'common/components/ui/Button/Button';
import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { Dialog } from 'common/components/ui/Dialog/Dialog';
import { SearchInput } from 'common/components/ui/SearchInput/SearchInput';
import { SortByPopup, SortByPopupOption } from 'common/components/ui/SortByPopup/SortByPopup';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { AccountType } from 'graphql/types';
import { getAmpluaName } from 'utils/houseTeam';
import { HOUSE_TEAM_MEMBER_CREATION_PAGE_ROUTE, INVITE_PAGE_ROUTE } from 'utils/routes';
import { TeamMemberAmpluaList } from 'variables/teamMemberAmpluaList';

import { NoMembersLink } from './NoMembersLink/NoMembersLink';

import s from './TeamMemberSelect.module.scss';

export interface TeamMemberSelectProps {
  loading: boolean;
  members: AccountType[];
  selectedMember: AccountType | null;
  setSelectedMember: (member: AccountType | null) => void;

  shouldAdapt: boolean;
}

const TEAM_MEMBERS_SORT_OPTIONS: SortByPopupOption[] = [
  { text: 'All amplua', value: 'All' },
  ...TeamMemberAmpluaList,
  {
    bottomDivider: true,
    text: 'Manager',
    value: 'Manager'
  },
  { text: 'Archived', value: 'Archived' },
  { text: 'Invited', value: 'Invited' }
];

export const TeamMemberSelect: React.FC<TeamMemberSelectProps> = ({
  loading,
  members,
  selectedMember,
  setSelectedMember,
  shouldAdapt
}) => {
  const intl = useIntl();

  const itemsRef = useRef<HTMLDivElement | null>(null);
  const modalToggler = useToggle();
  const isExtraSmall = useMediaQuery('(max-width: 362px)');
  const isEmpty = !members.length;

  const [itemsMaxHeight, setItemsMaxHeight] = useState<string>('100%');
  const [selectedSortOption, setSelectedSortOption] = useState(TEAM_MEMBERS_SORT_OPTIONS[0]);
  const [searchValue, setSearchValue] = useState('');
  const [memberInviteLink, setMemberInviteLink] = useState('');

  useEffect(() => {
    const onWindowResize = () => {
      const rects = itemsRef.current?.getBoundingClientRect();
      if (rects) {
        setItemsMaxHeight(`${window.innerHeight - rects.top - 20}px`);
      }
    };
    window.addEventListener('resize', onWindowResize);
    onWindowResize();
    return window.removeEventListener('resize', onWindowResize);
  }, []);

  const handleMemberCardClick = (m: AccountType) => {
    if (m.is_pending_invite && m.invite?.public_uuid) {
      setMemberInviteLink(window.origin + INVITE_PAGE_ROUTE.replace(':inviteId', m.invite?.public_uuid));
      modalToggler.set();
      setSelectedMember(m);
    } else {
      setSelectedMember(m);
    }
  };

  const renderTeamMember = (m: AccountType) => (
    <TeamMemberCard
      activeProjects={2}
      containerClassName={s.TeamMemberSelect__card}
      isActive={Boolean(selectedMember && m.id === selectedMember.id)}
      isOnline={m.is_active}
      key={m.id}
      name={m.name || ''}
      onClick={() => handleMemberCardClick(m)}
      role={getAmpluaName(m.amplua || '', intl)}
    />
  );

  const shownMembers = useMemo((): { invited: JSX.Element[]; pendingInvite: JSX.Element[] } => {
    let membersToReturn: AccountType[] = members;

    const isArchived = selectedSortOption.value === 'Archived';
    const isInvited = selectedSortOption.value === 'Invited';
    const isRole = selectedSortOption.value !== 'All' && !isArchived && !isInvited;

    if (isArchived) {
      membersToReturn = membersToReturn.filter((m) => !m.is_active);
    } else {
      membersToReturn = membersToReturn.filter((m) => m.is_active);
    }

    if (isInvited) {
      membersToReturn = membersToReturn.filter((m) => m.is_pending_invite);
    }

    if (isRole) {
      membersToReturn = membersToReturn.filter((m) => m.amplua === selectedSortOption.value);
    }

    membersToReturn = membersToReturn.filter((m) =>
      // @ts-ignore
      m.name.trim().toLowerCase().includes(searchValue.trim().toLowerCase())
    );

    return membersToReturn.reduce(
      (acc, member) => {
        if (member.is_pending_invite) {
          acc.pendingInvite.push(renderTeamMember(member));
        } else {
          acc.invited.push(renderTeamMember(member));
        }
        return acc;
      },
      { invited: [] as JSX.Element[], pendingInvite: [] as JSX.Element[] }
    );
  }, [members, selectedSortOption, searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className={s.TeamMemberSelect__container}>
      <div className={s.TeamMemberSelect__title}>
        <Text
          as="h1"
          text={intl.formatMessage({ defaultMessage: 'House Team', id: 'houseTeam.title' })}
          variant={isExtraSmall ? TextPropsVariantsEnum.H3 : TextPropsVariantsEnum.H2}
        />

        {!isEmpty && (
          <ButtonLink color="orange" size="s" to={HOUSE_TEAM_MEMBER_CREATION_PAGE_ROUTE} variant="secondary">
            <FormattedMessage defaultMessage="Add a team member" id="houseTeam.button.addTeamMember" />
          </ButtonLink>
        )}
      </div>

      <div className={s.TeamMemberSelect__controls}>
        <SortByPopup
          onChange={setSelectedSortOption}
          options={TEAM_MEMBERS_SORT_OPTIONS}
          selectedOption={selectedSortOption}
          dropdownClassName={s.TeamMemberSelect__controls_sort}
        />

        <SearchInput
          containerClassName={s.TeamMemberSelect__search}
          onChange={handleSearchChange}
          placeholder="Search"
        />
      </div>

      <div className={s.TeamMemberSelect__items} ref={itemsRef} style={{ maxHeight: itemsMaxHeight }}>
        {loading ? (
          <TeamMemberCardSkeleton countElements={7} />
        ) : (
          <>
            {!isEmpty ? (
              <>
                {!!shownMembers.invited.length && (
                  <div className={s.TeamMemberSelect__invited}>{shownMembers.invited}</div>
                )}
              </>
            ) : (
              <NoMembersLink />
            )}

            {shownMembers.pendingInvite.length > 0 && (
              <div>
                <Text
                  className={clsx(
                    s.TeamMemberSelect__title,
                    shownMembers.invited.length === 0 && s.TeamMemberSelect__title_notMargin
                  )}
                  color="textSecondary"
                  text={intl.formatMessage({ defaultMessage: 'Pending to respond', id: 'houseTeam.invite.pending' })}
                  variant={TextPropsVariantsEnum.CAPTION_M}
                />

                {shownMembers.pendingInvite}
              </div>
            )}
          </>
        )}
      </div>

      <Dialog
        icon={ColorfulIconTypes.GUEST_SETTINGS}
        isOpen={modalToggler.value}
        onClose={modalToggler.unset}
        title={intl.formatMessage({
          defaultMessage: 'New team member',
          id: 'houseTeam.dialog.newTeamMember.title'
        })}
      >
        <CreatedEntityLinkDialogContent
          description={intl.formatMessage({
            defaultMessage:
              'Now you can share invite link with your team member. In case you’ll need to copy the link again it will be in the House Team list and widget on the home ownership page',
            id: 'houseTeam.dialog.newTeamMember.created.description'
          })}
          link={memberInviteLink}
          title={intl.formatMessage({
            defaultMessage: 'A team member is created',
            id: 'houseTeam.dialog.newTeamMember.created.title'
          })}
        />
      </Dialog>
    </div>
  );
};
