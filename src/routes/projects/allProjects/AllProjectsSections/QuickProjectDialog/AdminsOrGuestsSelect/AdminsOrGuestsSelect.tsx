import React, { useState } from 'react';

import clsx from 'clsx';

import { Avatar } from 'common/components/ui/Avatar/Avatar';
import { SearchInput } from 'common/components/ui/SearchInput/SearchInput';
import { IUsualTab, UsualTabs } from 'common/components/ui/Tabs';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { TeamMemberType } from 'routes/houseTeam/HouseTeamViewMembers/tempData';

import s from './AdminsOrGuestsSelect.module.scss';

enum FiltersTypes {
  ADMINS = 'admins',
  GUESTS = 'guests'
}

const TABS: IUsualTab[] = [
  { text: 'Admins', value: FiltersTypes.ADMINS },
  { text: 'Guests', value: FiltersTypes.GUESTS }
];

export interface AdminsOrGuestsSelectProps {
  members: TeamMemberType[];
  selectedAdminsOrGuests: TeamMemberType[] | null;

  setSelectedAdminsOrGuests: (newMember: TeamMemberType) => void;
}

export const AdminsOrGuestsSelect: React.FC<AdminsOrGuestsSelectProps> = ({
  members,
  selectedAdminsOrGuests,
  setSelectedAdminsOrGuests
}) => {
  const [activeTabValue, setActiveTabValue] = useState(TABS[0].value);

  const handleClickMember = (member: TeamMemberType) => {
    return () => setSelectedAdminsOrGuests(member);
  };

  return (
    <div className={s.AdminsOrGuestsSelect__container}>
      <div className={s.AdminsOrGuestsSelect__header}>
        <UsualTabs
          tabs={TABS}
          value={activeTabValue}
          onChange={setActiveTabValue}
          containerClassName={s.AdminsOrGuestsSelect__tabsContainer}
        />

        <SearchInput containerClassName={s.AdminsOrGuestsSelect__searchInput} />
      </div>

      <div className={s.AdminsOrGuestsSelect__wrapper}>
        <div className={s.AdminsOrGuestsSelect__content}>
          <div className={s.AdminsOrGuestsSelect__background} />

          {members.map((m) => {
            const isActive = selectedAdminsOrGuests?.find((i) => i.id === m.id);

            return (
              <div
                key={m.id}
                className={clsx(s.AdminsOrGuestsSelect__memberCard, isActive && s.active)}
                onClick={handleClickMember(m)}>
                <Avatar
                  avatar={m.avatar}
                  width={40}
                  height={40}
                  containerClassName={s.AdminsOrGuestsSelect__memberAvatar}
                />

                <Text variant={TextPropsVariantsEnum.BODY_M} text={m.name} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
