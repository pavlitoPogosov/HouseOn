export type ITabBaseProps = {
  text: string;
  value: string;
};

export type TabsBaseProps = {
  value: string | null | undefined;
  containerClassName?: string;
  tabClassName?: string;

  onChange: (value: string) => void;
};
