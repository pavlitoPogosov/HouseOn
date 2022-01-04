import React, { useEffect } from 'react';

import clsx from 'clsx';

import { useToggle } from '@proscom/ui-react';
import { ReactComponent as SettingsIcon } from 'assets/icons/settings.svg';
import { IPeriodicityDifferentTab, IPeriodicityTab } from 'variables/periodicityTabs';

import { PeriodicitySelectValue } from '../PeriodicitySelect/PeriodicitySelect';

import { PeriodicityTab } from './PeriodicityTab/PeriodicityTab';
import { PeriodicityTabsDropdown } from './PeriodicityTabsDropdown/PeriodicityTabsDropdown';
import { PeriodicityTabsHint } from './PeriodicityTabsHint/PeriodicityTabsHint';

import s from './PeriodicityTabs.module.scss';

export interface PeriodicityTabsProps {
  containerClassName?: string;
  contentClassName?: string;
  tabClassName?: string;
  disableDifferent?: boolean;

  tabs: IPeriodicityTab[];
  selectedTab: IPeriodicityTab | null;

  onSelect: (selectedTab: IPeriodicityTab) => void;
}

export const PeriodicityTabs: React.FC<PeriodicityTabsProps> = ({
  tabs,
  selectedTab,
  tabClassName,
  containerClassName,
  contentClassName,
  onSelect
}) => {
  const differentEditToggler = useToggle();

  const handleTabClick = (tab: IPeriodicityTab) => {
    return () => onSelect(tab);
  };

  const handlePeriodicityChange = (value: PeriodicitySelectValue) => {
    differentEditToggler.unset();
    onSelect({
      ...selectedTab,
      value
    } as IPeriodicityDifferentTab);
  };

  const renderSelectedTabContent = () => {
    if (!selectedTab) {
      return null;
    }

    if (differentEditToggler.value && selectedTab.isDifferent) {
      return <PeriodicityTabsDropdown value={selectedTab.value} onChange={handlePeriodicityChange} />;
    }

    return <PeriodicityTabsHint selectedTab={selectedTab} onEdit={differentEditToggler.set} />;
  };

  useEffect(() => {
    if (!selectedTab?.isDifferent) {
      differentEditToggler.unset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTab?.isDifferent]);

  return (
    <div className={clsx(containerClassName)}>
      <div className={clsx(s.PeriodicityTabs__content, contentClassName)}>
        {tabs.map((t, i) => {
          const isSelected = selectedTab?.value === t.value || (selectedTab?.isDifferent && t.isDifferent);

          return (
            <PeriodicityTab
              key={i}
              onClick={handleTabClick(t)}
              isSelected={!!isSelected}
              containerClassName={clsx(s.PeriodicityTabs__tab, tabClassName)}>
              {t.isDifferent && <SettingsIcon />}

              {t.text}
            </PeriodicityTab>
          );
        })}
      </div>

      {renderSelectedTabContent()}
    </div>
  );
};
