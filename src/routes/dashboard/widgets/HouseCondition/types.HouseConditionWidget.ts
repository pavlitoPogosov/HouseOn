import { ECircleProgressWithMessageStates } from 'common/components/ui/CircleProgress/CircleProgressWithMessage/CircleProgressWithMessage';
import { TUseHomeStatusWithApiData } from 'common/hooks/useHomeStatusWithApi';


export type THouseConditionWidgetProps = {
  buttonLabel: string;
  buttonLink: string;
  conditionColor: ECircleProgressWithMessageStates;
  conditionLevel: number;
  conditionMessage: string;
  conditionTitle: string;
  homeStatusApiData: TUseHomeStatusWithApiData;
  houseLocation: string;
  houseName: string;
  isDataLoading: boolean;
  photo: string;
  recommendationsButtonLabel?: string;
  recommendationsButtonLink: string;
};
