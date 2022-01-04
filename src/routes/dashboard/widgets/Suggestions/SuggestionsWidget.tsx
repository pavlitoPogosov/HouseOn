import React from 'react';

import clsx from 'clsx';

import aiAssistantIcon from 'assets/icons/ai-assistant.png';
import { ButtonLink } from 'common/components/ui/Button';
import { ChatMessage, EChatMessageSide, EChatMessageTypes } from 'common/components/ui/ChatMessage/ChatMessage';
import { Loader } from 'common/components/ui/Loader/Loader';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { useMediaQuery } from 'common/hooks/useMediaQuery';

import { TSuggestionsWidgetProps } from './types.SuggestionsWidget';

import s from './SuggestionsWidget.module.scss';

export interface ISuggestionsWidgetProps {
  containerClassName?: string;
  contentClassName?: string;
  contentDetailsClassName?: string;
  contentImageClassName?: string;
}

export const SuggestionsWidget: React.FC<ISuggestionsWidgetProps & TSuggestionsWidgetProps> = (props) => {
  const {
    containerClassName,
    contentClassName,
    contentDetailsClassName,
    contentImageClassName,
    currentSuggestion,
    greeting,
    isDataLoading = false,
    suggestionsButtonLabel,
    suggestionsButtonLink
  } = props;

  const contentImageStyle = isDataLoading ? {} : { backgroundImage: `url(${currentSuggestion.image})` };
  const isTablet = useMediaQuery('(max-width: 992px)');

  return (
    <div className={clsx(s.SuggestionsWidget__container, containerClassName, isDataLoading && s.loading)}>
      {isDataLoading ? (
        <Loader />
      ) : (
        <div className={clsx(s.SuggestionsWidget__content, contentClassName)}>
          <div className={clsx(s.SuggestionsWidget__content_details, contentDetailsClassName)}>
            <div className={clsx(s.SuggestionsWidget__content_details_greeting, contentDetailsClassName)}>
              <img
                alt="Assistant"
                className={clsx(s.SuggestionsWidget__content_details_greeting_assistant, contentDetailsClassName)}
                src={aiAssistantIcon}
              />

              <ChatMessage
                containerClassName={clsx(
                  s.SuggestionsWidget__content_details_greeting_message,
                  contentDetailsClassName
                )}
                isLast
                message={greeting}
                side={EChatMessageSide.LEFT}
                type={EChatMessageTypes.PRIMARY}
              />
            </div>

            <Text
              className={clsx(s.SuggestionsWidget__content_details_suggestion, contentDetailsClassName)}
              color="white"
              text={currentSuggestion.text}
              variant={TextPropsVariantsEnum.BODY_M}
            />

            {!isTablet && suggestionsButtonLabel && suggestionsButtonLink && (
              <ButtonLink
                className={s.SuggestionsWidget__button}
                color="transparent-outlined"
                rightIcon="&gt;"
                to={suggestionsButtonLink}
                variant="primary">
                {suggestionsButtonLabel}
              </ButtonLink>
            )}
          </div>

          <div className={clsx(s.SuggestionsWidget__content_image, contentImageClassName)} style={contentImageStyle} />

          {isTablet && suggestionsButtonLabel && suggestionsButtonLink && (
            <ButtonLink
              className={s.SuggestionsWidget__button}
              color="transparent-outlined"
              rightIcon="&gt;"
              to={suggestionsButtonLink}
              variant="primary">
              {suggestionsButtonLabel}
            </ButtonLink>
          )}
        </div>
      )}
    </div>
  );
};
