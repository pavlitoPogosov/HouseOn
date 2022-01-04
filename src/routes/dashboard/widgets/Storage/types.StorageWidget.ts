import { IUsualTab } from 'common/components/ui/Tabs';

export enum ETabsTypes {
  HOUSE_DATA = 'HOUSE_DATA',
  SUBSCRIPTION = 'SUBSCRIPTION'
}

export type TStorageWidgetProps = {
  activeTab: ETabsTypes;
  availableLeftSpace: number;
  availableStorage: string;
  availableTotalSpace: number;
  detailsStorage: string;
  documentsButtonLink: string;
  image: string;
  isDataLoading?: boolean;
  onTabsChange: (tab: ETabsTypes) => void;
  openButtonLink: string;
  tabs: IUsualTab[];
  title: string;
};
