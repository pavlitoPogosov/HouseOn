import React from 'react';

import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { HouseType } from 'graphql/types';

import { ProfileHouseholdCard } from './ProfileHouseholdCard/ProfileHouseholdCard';

import s from './ProfileSettingsContent.module.scss';

export interface ProfileSettingsContentProps {
  houses: HouseType[] | undefined | null;
}

export const ProfileSettingsContent: React.FC<ProfileSettingsContentProps> = ({ houses }) => {
  if (!houses?.length) return null;

  return (
    <div className={s.ProfileSettingsContent__container}>
      <Text text="My households" variant={TextPropsVariantsEnum.H3} className={s.ProfileSettingsContent__title} />

      {houses.map((h) => (
        <ProfileHouseholdCard
          key={h.id}
          containerClassName={s.ProfileSettingsContent__card}
          title={h.title}
          creationDate={'1995-12-17T03:24:00'}
          updatedDate={'1995-12-17T03:24:00'}
          comment={''}
        />
      ))}
    </div>
  );
};
