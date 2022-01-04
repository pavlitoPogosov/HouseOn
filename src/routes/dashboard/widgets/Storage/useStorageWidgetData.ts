import { useEffect, useState } from 'react';

import { IUsualTab } from 'common/components/ui/Tabs';

import { ETabsTypes, TStorageWidgetProps } from './types.StorageWidget';

const tabs: IUsualTab[] = [
  { text: 'HouseData', value: ETabsTypes.HOUSE_DATA },
  { text: 'Subscription', value: ETabsTypes.SUBSCRIPTION }
];

type TDataItem = {
  availableLeftSpace: number;
  availableTotalSpace: number;
  image: string;
};

type TData = {
  [key in ETabsTypes]: TDataItem;
};

/* TODO: подключить API */
export const useStorageWidgetData = (): TStorageWidgetProps => {
  const title = 'Storage';
  const isDataLoading = false;

  const houseData: TData = {
    [ETabsTypes.HOUSE_DATA]: {
      availableLeftSpace: 40,
      availableTotalSpace: 50,
      image: 'https://www.cybiant.com/wp-content/uploads/2020/08/Big-Data-Storage.jpg'
    },

    [ETabsTypes.SUBSCRIPTION]: {
      availableLeftSpace: 20,
      availableTotalSpace: 80,
      image: 'https://www.cybiant.com/wp-content/uploads/2020/08/Big-Data-Storage.jpg'
    }
  };

  const [activeTab, setActiveTab] = useState<ETabsTypes>(tabs[0].value as ETabsTypes);
  const [data, setData] = useState<TDataItem>(houseData[activeTab]);

  const onTabsChange = (tab: ETabsTypes) => {
    setActiveTab(tab);
  };

  const image = data?.image || '';

  const availableLeftSpace = data?.availableLeftSpace || 0;
  const availableTotalSpace = data?.availableTotalSpace || 0;

  const availableStorage = `${availableTotalSpace} GB available to you`;
  const detailsStorage = `${availableLeftSpace} GB left in storage`;

  const openButtonLink = '/';
  const documentsButtonLink = '/';

  useEffect(() => {
    setData(houseData[activeTab]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  return {
    activeTab,
    availableLeftSpace,
    availableStorage,
    availableTotalSpace,
    detailsStorage,
    documentsButtonLink,
    image,
    isDataLoading,
    onTabsChange,
    openButtonLink,
    tabs,
    title
  };
};
