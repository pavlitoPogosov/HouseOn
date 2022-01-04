export type TDataItem = {
  author: string;
  date: string;
  id: number;
  image: string;
  imagesNumber: number;
  location: string;
  title: string;
};

export type TUpcomingEventsWidgetProps = {
  data: TDataItem[];
  isDataLoading?: boolean;
  title: string;
};
