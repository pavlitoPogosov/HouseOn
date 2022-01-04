import { ECircleProgressWithMessageStates } from 'common/components/ui/CircleProgress/CircleProgressWithMessage/CircleProgressWithMessage';
import { useHomeStatusWithApi } from 'common/hooks/useHomeStatusWithApi';
import { DASHBOARD_PAGE_ROUTE } from 'utils/routes';

import { THouseConditionWidgetProps } from './types.HouseConditionWidget';

/* TODO: подключить API */
export const useHouseConditionWidgetData = (): THouseConditionWidgetProps => {
  /* детальная информация по дому, получаемая по id */
  const houseData = {
    houseLocation: 'Los Angeles, California',
    houseName: 'Santa Monica Studio'
  };

  /* детальная информация по состоянию дома, получаемая по id */
  const houseCondition = {
    conditionLevel: 70,
    conditionMessage: 'Your house is in an excellent condition. Of course, you can do even better',
    conditionTitle: 'Good news for you!',
    recommendationsCount: 2
  };

  /* фото дома, получаемое по id */
  const housePhoto = {
    photo:
      'https://d1ez3020z2uu9b.cloudfront.net/imagecache/rental-homes-photos-spain/Original/7331/12461579-7331-Adeje-Villa_Crop_725_600.jpg'
  };

  /* состояние загрузки данных для виджета */
  const isDataLoading = false;

  const homeStatusApiData = useHomeStatusWithApi();

  const { recommendationsCount } = houseCondition || {};

  /* TODO: заменить на автоматическое определение множественной формы из библиотеки локализации */
  const isRecommendations = typeof recommendationsCount === 'number' && recommendationsCount > 0;
  const isPlural = isRecommendations && recommendationsCount > 1;
  const recommendationsPlural = isPlural ? 'recommendations' : 'recommendation';
  const recommendationsButtonLabel = isRecommendations
    ? `View ${recommendationsCount} ${recommendationsPlural}`
    : undefined;

  const lvl = houseCondition.conditionLevel;
  const isRed = lvl > 0 && lvl < 30;
  const isYellow = lvl >= 30 && lvl < 70;
  let conditionColor: ECircleProgressWithMessageStates;

  if (isRed) {
    conditionColor = ECircleProgressWithMessageStates.BIG_RED_LIGHT;
  } else if (isYellow) {
    conditionColor = ECircleProgressWithMessageStates.BIG_YELLOW_LIGHT;
  } else {
    conditionColor = ECircleProgressWithMessageStates.BIG_GREEN_LIGHT;
  }

  /* данные для виджета "TodayProjectsWidget" */
  return {
    ...houseData,
    ...houseCondition,
    ...housePhoto,
    buttonLabel: 'Go to home page',
    buttonLink: DASHBOARD_PAGE_ROUTE,
    conditionColor,
    homeStatusApiData,
    isDataLoading,
    recommendationsButtonLabel,
    recommendationsButtonLink: DASHBOARD_PAGE_ROUTE
  };
};
