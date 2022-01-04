import { PeriodicitySelectFieldInitialValue } from 'common/components/ui/_formikComponents/PeriodicitySelectField/PeriodicitySelectField';
import { PeriodicitySelectValue } from 'common/components/ui/PeriodicitySelect/PeriodicitySelect';

export type IPeriodicityDifferentTab = {
  isDifferent: true;
  text: string;
  value: PeriodicitySelectValue;
};

export type IPeriodicityTab =
  | {
      text: string;
      value: string;
      captionText: string;
      isDifferent: false;
    }
  | IPeriodicityDifferentTab;

export const ONCE_TAB: IPeriodicityTab = {
  text: 'Once',
  value: 'once',
  captionText: 'once',
  isDifferent: false
};

export const EVERY_WEEK_TAB: IPeriodicityTab = {
  text: 'Every week',
  value: 'week',
  captionText: 'week',
  isDifferent: false
};

export const EVERY_MONTH_TAB: IPeriodicityTab = {
  text: 'Every month',
  value: 'month',
  captionText: 'month',
  isDifferent: false
};

export const DIFFERENT_TAB: IPeriodicityTab = {
  text: 'Different',
  isDifferent: true,
  value: PeriodicitySelectFieldInitialValue
};
