import React, { useLayoutEffect, useState } from 'react';

import { appHistory } from 'appHistory';

import { ReactComponent as ChevronLeftIcon } from 'assets/icons/chevronLeft.svg';
import { Fade } from 'common/components/ui/_animations/Fade/Fade';
import { Button } from 'common/components/ui/Button';
import { IconCircle } from 'common/components/ui/IconCircle/IconCircle';
import { TextTabs } from 'common/components/ui/Tabs';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import { CommentsTab } from './_tabs/CommentsTab/CommentsTab';
import { DirectionsTab } from './_tabs/DirectionsTab/DirectionsTab';
import { InstructionsTab } from './_tabs/InstructionsTab/InstructionsTab';
import { MainTab } from './_tabs/MainTab/MainTab';
import { PhonesTab } from './_tabs/PhonesTab/PhonesTab';

import s from './HouseSettingsMain.module.scss';

export enum TabsTypes {
  MAIN = 'main',
  PHONES = 'phones',
  DIRECTIONS = 'directions',
  COMMENTS = 'comments',
  INSTRUCTIONS = 'instructions'
}

export interface IHouseSettingsTab {
  text: string;
  value: string;
  component: React.FC<any>;
}

const TABS: { [key in TabsTypes]: IHouseSettingsTab } = {
  [TabsTypes.MAIN]: {
    text: TabsTypes.MAIN,
    value: TabsTypes.MAIN,
    component: MainTab
  },
  [TabsTypes.PHONES]: {
    text: TabsTypes.PHONES,
    value: TabsTypes.PHONES,
    component: PhonesTab
  },
  [TabsTypes.DIRECTIONS]: {
    text: TabsTypes.DIRECTIONS,
    value: TabsTypes.DIRECTIONS,
    component: DirectionsTab
  },
  [TabsTypes.COMMENTS]: {
    text: TabsTypes.COMMENTS,
    value: TabsTypes.COMMENTS,
    component: CommentsTab
  },
  [TabsTypes.INSTRUCTIONS]: {
    text: TabsTypes.INSTRUCTIONS,
    value: TabsTypes.INSTRUCTIONS,
    component: InstructionsTab
  }
};

export interface HouseSettingsMainProps {}
export const HouseSettingsMain: React.FC<HouseSettingsMainProps> = () => {
  const [activeTab, setActiveTab] = useState<string>(TabsTypes.MAIN);

  const isTablet = useMediaQuery('(min-width: 576px)');

  const handleTabChange = (value: string) => {
    appHistory.push({
      search: value
    });
    setActiveTab(value);
  };

  const renderBackLink = () => {
    if (!appHistory.canGoBack()) return null;

    const handleGoBack = () => appHistory.goBack();

    return (
      <IconCircle
        icon={<ChevronLeftIcon />}
        width={32}
        height={32}
        shadow="l"
        className={s.HouseSettingsMain__backIcon}
        onClick={handleGoBack}
      />
    );
  };

  // @ts-ignore
  const ActiveTabCmp = (TABS[activeTab] as IHouseSettingsTab).component;

  useLayoutEffect(() => {
    const searchQuery = appHistory.location.search.split('?')[1];
    const tabQuery = Object.values<string>(TabsTypes).find((t) => t === searchQuery);
    const tab = (Object.entries(TabsTypes).find(([name, value]) => value === tabQuery) || [])[0];

    // @ts-ignore
    setActiveTab(tab ? TabsTypes[tab] : TabsTypes.MAIN);
  }, []);

  return (
    <div className={s.HouseSettingsMain__container}>
      <div className={s.HouseSettingsMain__header}>
        <Text
          variant={isTablet ? TextPropsVariantsEnum.H2 : TextPropsVariantsEnum.BODY_L}
          className={s.HouseSettingsMain__title}
          as="h1">
          {renderBackLink()}
          Settings
        </Text>

        <Button size="s" color="orange" variant="secondary">
          Backup House
        </Button>
      </div>

      <div className={s.HouseSettingsMain__tabsWrapper}>
        <TextTabs
          tabs={Object.values(TABS)}
          value={activeTab}
          onChange={handleTabChange}
          containerClassName={s.HouseSettingsMain__tabsContainer}
          tabClassName={s.HouseSettingsMain__tab}
        />
      </div>

      <Fade key={activeTab} isActive>
        <ActiveTabCmp />
      </Fade>
    </div>
  );
};
