import React from 'react';

import clsx from 'clsx';

import { Avatar } from 'common/components/ui/Avatar/Avatar';

import { ITabBaseProps, TabsBaseProps } from '../types';

import s from './HouseTabs.module.scss';

export type ITHouseTab = ITabBaseProps & { image?: string };

export type HouseTabsProps = {
  tabs: ITHouseTab[];
} & TabsBaseProps;

export const HouseTabs: React.FC<HouseTabsProps> = ({ tabs, value, containerClassName, tabClassName, onChange }) => {
  const handleTabChange = (tabValue: string) => {
    return () => {
      if (tabValue !== value) {
        onChange(tabValue);
      }
    };
  };

  return (
    <div className={clsx(s.HouseTabs__container, containerClassName)}>
      {tabs.map((t, i) => (
        <div
          key={t.value + i}
          onClick={handleTabChange(t.value)}
          className={clsx(s.HouseTabs__tab, t.value === value && s.active, tabClassName)}>
          <Avatar
            // TODO wait for api house img
            // avatar={t.image}
            width={24}
            height={24}
            containerClassName={s.HouseTabs__tabImage}
            emptyClassName={s.HouseTabs__tabEmptyImage}
          />

          <div className={s.HouseTabs__tabText}>{t.text}</div>
        </div>
      ))}
    </div>
  );
};
