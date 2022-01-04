import React, { useCallback, useMemo } from 'react';
import { useLocation } from 'react-router';

import { ColorfulIconTypes } from 'common/components/ui/ColorfulIcon/ColorfulIcon';
import { ModalManagerNames } from 'routes/_layouts/UserModalsLayout/ModalManager/ModalManager';
import { SETTINGS_HOUSE_PAGE_ROUTE } from 'utils/routes';

import { HouseDataTab } from './HouseDataTab/HouseDataTab';
import { UsualTab } from './UsualTab/UsualTab';

import s from './AsideTabs.module.scss';

export interface AsideTabsProps {}

export const AsideTabs: React.FC<AsideTabsProps> = () => {
  const location = useLocation();

  const getTabLink = useCallback(
    (query: string) => {
      return location.pathname + '?' + new URLSearchParams(location.search + query).toString();
    },
    [location]
  );

  const tabs = useMemo(() => {
    const isActive = true;

    return [
      <UsualTab
        link={getTabLink(`?modalType=${ModalManagerNames.PHONES}`)}
        text={ModalManagerNames.PHONES}
        iconType={ColorfulIconTypes.PHONE}
        isInActive={!isActive}
      />,
      <UsualTab
        link={getTabLink(`?modalType=${ModalManagerNames.DIRECTIONS}`)}
        text={ModalManagerNames.DIRECTIONS}
        iconType={ColorfulIconTypes.GEOMARK}
        isInActive={!isActive}
      />,
      <HouseDataTab />,
      <UsualTab
        link={getTabLink(`?modalType=${ModalManagerNames.HISTORY}`)}
        text={ModalManagerNames.HISTORY}
        iconType={ColorfulIconTypes.HISTORY}
        isInActive={!isActive}
      />,
      <UsualTab
        link={getTabLink(`?modalType=${ModalManagerNames.INSTRUCTIONS}`)}
        text={ModalManagerNames.INSTRUCTIONS}
        iconType={ColorfulIconTypes.INSTRUCTION}
        isInActive={!isActive}
      />,
      <UsualTab
        link={getTabLink(`?modalType=${ModalManagerNames.COMMENTS}`)}
        text={ModalManagerNames.COMMENTS}
        iconType={ColorfulIconTypes.COMMENT}
        isInActive={!isActive}
      />,
      <UsualTab
        link={SETTINGS_HOUSE_PAGE_ROUTE}
        text="Settings"
        iconType={ColorfulIconTypes.SETTINGS}
        isInActive={!isActive}
      />
    ];
  }, [getTabLink]);

  return (
    <div className={s.AsideTabs__container}>
      {tabs.map((t, i) => (
        <React.Fragment key={i}>{t}</React.Fragment>
      ))}
    </div>
  );
};
