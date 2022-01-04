import React from 'react';

import clsx from 'clsx';

import { ButtonLink } from 'common/components/ui/Button';
import {
  CircleProgressWithMessage,
  ECircleProgressWithMessageStates
} from 'common/components/ui/CircleProgress/CircleProgressWithMessage/CircleProgressWithMessage';
import { HomeStatus } from 'common/components/ui/HomeStatus/HomeStatus';
import { Loader } from 'common/components/ui/Loader/Loader';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';

import { LocationLabel } from './LocationLabel/LocationLabel';
import { THouseConditionWidgetProps } from './types.HouseConditionWidget';

import s from './HouseConditionWidget.module.scss';

export interface IHouseConditionWidgetProps {
  containerClassName?: string;
  contentClassName?: string;
}

export const HouseConditionWidget: React.FC<IHouseConditionWidgetProps & THouseConditionWidgetProps> = (props) => {
  const {
    buttonLabel,
    buttonLink,
    conditionLevel,
    conditionColor = ECircleProgressWithMessageStates.BIG_GREEN_LIGHT,
    conditionMessage,
    conditionTitle,
    containerClassName,
    contentClassName,
    homeStatusApiData,
    houseLocation,
    houseName,
    isDataLoading = false,
    photo,
    recommendationsButtonLabel,
    recommendationsButtonLink
  } = props;

  const containerStyle = isDataLoading ? {} : { backgroundImage: `url(${photo})` };

  const { statusInputToggler, ...options } = homeStatusApiData || {};

  return (
    <div
      className={clsx(s.HouseConditionWidget__container, containerClassName, isDataLoading && s.loading)}
      style={containerStyle}>
      {!isDataLoading && (
        <div
          className={clsx(
            s.HouseConditionWidget__layer_gradient,
            s.HouseConditionWidget__layer_gradient_from_top_left_dark
          )}
        />
      )}

      {!isDataLoading && (
        <div
          className={clsx(s.HouseConditionWidget__layer_gradient, {
            [s.HouseConditionWidget__layer_gradient_from_top_right_green]:
              conditionColor === ECircleProgressWithMessageStates.BIG_GREEN_LIGHT,
            [s.HouseConditionWidget__layer_gradient_from_top_right_yellow]:
              conditionColor === ECircleProgressWithMessageStates.BIG_YELLOW_LIGHT,
            [s.HouseConditionWidget__layer_gradient_from_top_right_red]:
              conditionColor === ECircleProgressWithMessageStates.BIG_RED_LIGHT
          })}
        />
      )}

      {isDataLoading ? (
        <Loader />
      ) : (
        <div className={clsx(s.HouseConditionWidget__content, contentClassName)}>
          <div className={s.content__details}>
            <Text
              className={s.content__details_title}
              color="white"
              text={houseName}
              variant={TextPropsVariantsEnum.H2}
            />

            <LocationLabel className={s.content__details_location} locationName={houseLocation} />

            <div className={clsx(s.content__details_home_status)}>
              <HomeStatus {...options} statusInputToggler={statusInputToggler} />
            </div>

            <ButtonLink
              className={s.content__details_button}
              color="orange"
              rightIcon="&gt;"
              to={buttonLink}
              variant="primary">
              {buttonLabel}
            </ButtonLink>
          </div>

          <div className={clsx(s.content__divider)} />

          <div className={s.content__condition}>
            <Text
              className={s.content__condition_title}
              color="white"
              text={conditionTitle}
              variant={TextPropsVariantsEnum.H4}
            />

            <CircleProgressWithMessage
              containerClassName={s.content__condition_progress_container}
              messageContainerClassName={s.content__condition_progress_message_container}
              percentage={conditionLevel}
              progressClassName={s.content__condition_progress}
              progressColor={conditionColor}
              text={conditionMessage}
            />

            {recommendationsButtonLabel && (
              <ButtonLink
                className={s.content__condition_button}
                color="transparent-outlined"
                rightIcon="&gt;"
                to={recommendationsButtonLink}
                variant="primary">
                {recommendationsButtonLabel}
              </ButtonLink>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
