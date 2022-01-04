export type TDataItem = {
  avatar: string;
  id: number;
  isOnline: boolean;
  memberLink: string;
  name: string;
  role: string;
  tasks: number;
};

export type TWorkingTodayWidgetProps = {
  data: TDataItem[];
  isDataLoading?: boolean;
  onMessageClick: (id: number) => void;
  title: string;
};
