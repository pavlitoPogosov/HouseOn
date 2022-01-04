export type TCurrentSuggestion = {
  image: string;
  text: string;
};

export type TSuggestionsWidgetProps = {
  currentSuggestion: TCurrentSuggestion;
  greeting: string;
  isDataLoading: boolean;
  suggestionsButtonLabel?: string;
  suggestionsButtonLink?: string;
};
