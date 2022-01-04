export type TDataItem = {
  avatar: string;
  date: string;
  id: number;
  memberLink: string;
  name: string;
};

export type TPendingInvitesWidgetProps = {
  data: TDataItem[];
  isDataLoading?: boolean;
  onCopyClick: (id: number) => void;
  onEditClick: (id: number) => void;
  title: string;
};
