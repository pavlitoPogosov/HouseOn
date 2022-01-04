import React, { useMemo } from 'react';

import { chunk } from 'lodash';

import { HouseTabs } from 'common/components/ui/Tabs';
import { useTypedDispatch } from 'redux/hooks/useTypedDispatch';
import { useTypedSelector } from 'redux/hooks/useTypedSelector';
import { setCurrentAccountIdAC } from 'redux/slices/accountsSlice/actionCreators';

import s from './UserNotificationTabs.module.scss';

export interface UserNotificationTabsProps {}

export const UserNotificationTabs: React.FC<UserNotificationTabsProps> = () => {
  const { currentAccountId, availableAccounts } = useTypedSelector((s) => s.accounts);
  const dispatch = useTypedDispatch();

  const mappedHouses = useMemo(() => {
    const housesToChunk = availableAccounts?.map((a) => ({
      text: a.house.title,
      value: a.id,
      image: ''
    }));

    return chunk(housesToChunk, 2);
  }, [availableAccounts]);

  if (!availableAccounts || availableAccounts.length <= 1) return null;

  const handleHouseSelect = (accountId: string) => {
    if (accountId === currentAccountId) return;

    dispatch(setCurrentAccountIdAC(accountId));
  };

  return (
    <div className={s.UserNotificationTabs__container}>
      {mappedHouses.map((tabs, i) => (
        <HouseTabs
          tabs={tabs}
          value={currentAccountId || ''}
          onChange={handleHouseSelect}
          key={i}
          containerClassName={s.UserNotificationTabs__tabsContainer}
          tabClassName={s.UserNotificationTabs__tab}
        />
      ))}
    </div>
  );
};
