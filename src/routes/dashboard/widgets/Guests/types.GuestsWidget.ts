export type TDataItem = {
  avatar: string;
  date: string;
  id: number;
  memberLink: string;
  name: string;
};

export type TGuestsWidgetProps = {
  data: TDataItem[];
  isDataLoading?: boolean;
  onMessageClick: (id: number) => void;
  title: string;
};
