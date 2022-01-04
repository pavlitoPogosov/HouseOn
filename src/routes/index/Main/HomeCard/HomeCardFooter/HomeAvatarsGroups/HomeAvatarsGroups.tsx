import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

import { AvatarGroup } from 'common/components/ui/AvatarGroup/AvatarGroup';
import { useMediaQuery } from 'common/hooks/useMediaQuery';
import { useQueryWithError } from 'common/hooks/useQueryWithError';
import { QUERY_ACCOUNTS_COUNT } from 'graphql/queries/accounts';
import { AccountFilterInput, AccountRolesEnum } from 'graphql/types';
import { ModalManagerNames } from 'routes/_layouts/UserModalsLayout/ModalManager/ModalManager';

import s from './HomeAvatarsGroups.module.scss';

export interface HomeAvatarsGroupsProps {}

export const HomeAvatarsGroups: React.FC<HomeAvatarsGroupsProps> = () => {
  const isAvatarsGroupsShown = useMediaQuery('(min-width: 992px)');

  const { data, refetch } = useQueryWithError<
    { result: { id: string; role: AccountRolesEnum }[] },
    { input: AccountFilterInput }
  >(QUERY_ACCOUNTS_COUNT, {
    variables: {
      input: {
        is_deactivated: false,
        is_pending_invite: false,
        roles: [AccountRolesEnum.Admin, AccountRolesEnum.Guest]
      }
    }
  });

  const [adminsCount, guestsCount] = useMemo(() => {
    let admins = 0;
    let guests = 0;

    data?.result.forEach(({ role }) => {
      if (role === AccountRolesEnum.Admin) {
        admins += 1;
      } else {
        guests += 1;
      }
    });

    return [admins, guests];
  }, [data?.result]);

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={s.HomeAvatarsGroups__container}>
      <Link to={`?modalType=${ModalManagerNames.INVITE_ADMINS}`}>
        <div className={s.HomeAvatarsGroups__persons}>
          <span className={s.HomeAvatarsGroups__title}>Admins</span>

          {isAvatarsGroupsShown && <AvatarGroup size={24} />}

          <span className={s.HomeAvatarsGroups__amount}>
            {!!adminsCount && <span className={s.HomeAvatarsGroups__plusSign}>+</span>}
            {adminsCount}
          </span>
        </div>
      </Link>

      <Link to={`?modalType=${ModalManagerNames.INVITE_GUESTS}`}>
        <div className={s.HomeAvatarsGroups__persons}>
          <span className={s.HomeAvatarsGroups__title}>Guests</span>

          {isAvatarsGroupsShown && <AvatarGroup size={24} />}

          <span className={s.HomeAvatarsGroups__amount}>
            {!!guestsCount && <span className={s.HomeAvatarsGroups__plusSign}>+</span>}
            {guestsCount}
          </span>
        </div>
      </Link>
    </div>
  );
};
