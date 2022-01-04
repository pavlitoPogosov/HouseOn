import { DASHBOARD_PAGE_ROUTE } from 'utils/routes';

import { TSuggestionsWidgetProps } from './types.SuggestionsWidget';

/* TODO: подключить API */
export const useSuggestionsWidgetData = (): TSuggestionsWidgetProps => {
  const userName = 'Margaret';

  /* актуальный suggestion, который будем выводить в виджет */
  const currentSuggestion = {
    image:
      'https://d1ez3020z2uu9b.cloudfront.net/imagecache/rental-homes-photos-spain/Original/7331/12461579-7331-Adeje-Villa_Crop_725_600.jpg',
    text: 'The summer season is coming, so it’s time to set a task for cleaning the pool. And paint the porch.'
  };

  /* состояние загрузки данных для виджета */
  const isDataLoading = false;

  const suggestionsCount = 4;

  /* TODO: заменить на автоматическое определение множественной формы из библиотеки локализации */
  const isRecommendations = typeof suggestionsCount === 'number' && suggestionsCount > 0;
  const isPlural = isRecommendations && suggestionsCount > 1;
  const suggestionsPlural = isPlural ? 'suggestions' : 'suggestion';
  const suggestionsButtonLabel = isRecommendations ? `View ${suggestionsCount} ${suggestionsPlural}` : undefined;

  const greeting = `Dear ${userName},`;

  /* данные для виджета "TodayProjectsWidget" */
  return {
    currentSuggestion,
    greeting,
    isDataLoading,
    suggestionsButtonLabel,
    suggestionsButtonLink: DASHBOARD_PAGE_ROUTE
  };
};
