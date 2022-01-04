import React from 'react';

import clsx from 'clsx';

import { TabsBaseProps, ITabBaseProps } from '../types';

import s from './UsualTabs.module.scss';

export type IUsualTab = ITabBaseProps;
export type UsualTabsProps = {
  tabs: IUsualTab[];
  size?: 'm' | 'l';
} & TabsBaseProps;

export const UsualTabs: React.FC<UsualTabsProps> = ({
  containerClassName,
  tabClassName,
  tabs,
  value,
  size = 'm',
  onChange
}) => {
  const handleTabChange = (tabValue: string) => {
    return () => {
      if (tabValue !== value) {
        onChange(tabValue);
      }
    };
  };

  return (
    <div
      className={clsx(
        s.UsualTabs__container,
        {
          [s.UsualTabs__m]: size === 'm',
          [s.UsualTabs__l]: size === 'l'
        },
        containerClassName
      )}>
      {tabs.map((t, i) => (
        <div
          key={t.value + i}
          onClick={handleTabChange(t.value)}
          className={clsx(
            s.UsualTabs__tab,
            {
              [s.UsualTabs__tab_m]: size === 'm',
              [s.UsualTabs__tab_l]: size === 'l',
              [s.active]: t.value === value
            },
            tabClassName
          )}>
          {t.text}
        </div>
      ))}
    </div>
  );
};
