import React from 'react';

import clsx from 'clsx';

import { ITabBaseProps, TabsBaseProps } from '../types';

import s from './TextTabs.module.scss';

export type ITextTab = ITabBaseProps;

export type TextTabsProps = {
  tabs: ITextTab[];
  includeBorderBottom?: boolean;
  size?: 'm' | 'l';
} & TabsBaseProps;

export const TextTabs: React.FC<TextTabsProps> = ({
  tabs,
  value,
  containerClassName,
  tabClassName,
  size = 'm',
  includeBorderBottom,
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
        s.TextTabs__container,
        {
          [s.TextTabs__m]: size === 'm',
          [s.TextTabs__l]: size === 'l',
          [s.border]: includeBorderBottom
        },
        containerClassName
      )}>
      {tabs.map((t, i) => (
        <div
          key={t.value + i}
          onClick={handleTabChange(t.value)}
          className={clsx(
            s.TextTabs__tab,
            {
              [s.TextTabs__tab_m]: size === 'm',
              [s.TextTabs__tab_l]: size === 'l',
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
