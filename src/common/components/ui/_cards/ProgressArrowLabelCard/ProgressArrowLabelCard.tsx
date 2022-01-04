import React from 'react';

import clsx from 'clsx';

import { ReactComponent as ArrowWithLineIcon } from 'assets/icons/arrow-with-line.svg';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { EColors } from 'variables/colors';

import { CircleProgressWithChildren } from '../../CircleProgress/CircleProgressWithChildren/CircleProgressWithChildren';

import s from './ProgressArrowLabelCard.module.scss';

export enum EProgressArrowLabelCardStates {
  DOWN_LEFT = 'down_left',
  DOWN_RIGHT = 'down_right',
  UP_LEFT = 'up_left',
  UP_RIGHT = 'up_right'
}

type TProgressArrowLabelCardProps = {
  arrowState: EProgressArrowLabelCardStates;
  containerClassName?: string;
  detailsContainerClassName?: string;
  progressBackgroundColor?: EColors;
  progressChildrenClassName?: string;
  progressChildrenContainerClassName?: string;
  progressColor?: EColors;
  progressContainerArrowClassName?: string;
  progressContainerArrowContainerClassName?: string;
  progressContainerArrowContainerWrapperClassName?: string;
  progressContainerClassName?: string;
  progressDonutHoleClassName?: string;
  progressHoleColor?: EColors;
  progressPercentage: number;
  progressProgressBackgroundSvgClassName?: string;
  progressProgressSvgClassName?: string;
  progressStrokeWidth?: number;
  progressWrapperClassName?: string;
  title: string;
  titleClassName?: string;
  valueClassName?: string;
};

export const ProgressArrowLabelCard: React.FC<TProgressArrowLabelCardProps> = (props) => {
  const {
    arrowState,
    containerClassName,
    detailsContainerClassName,
    progressBackgroundColor,
    progressChildrenClassName,
    progressChildrenContainerClassName,
    progressColor,
    progressContainerArrowClassName,
    progressContainerArrowContainerClassName,
    progressContainerArrowContainerWrapperClassName,
    progressContainerClassName,
    progressDonutHoleClassName,
    progressHoleColor,
    progressPercentage,
    progressProgressBackgroundSvgClassName,
    progressProgressSvgClassName,
    progressStrokeWidth,
    progressWrapperClassName,
    title,
    titleClassName,
    valueClassName
  } = props;

  let rotation: number;

  switch (arrowState) {
    case EProgressArrowLabelCardStates.UP_RIGHT:
      rotation = 0;
      break;

    case EProgressArrowLabelCardStates.UP_LEFT:
      rotation = 270;
      break;

    case EProgressArrowLabelCardStates.DOWN_RIGHT:
      rotation = 90;
      break;

    case EProgressArrowLabelCardStates.DOWN_LEFT:
      rotation = 180;
      break;

    default:
      rotation = 0;
  }

  return (
    <div className={clsx(s.ProgressArrowLabelCard__container, containerClassName)}>
      <CircleProgressWithChildren
        backgroundColor={progressBackgroundColor}
        childrenClassName={progressChildrenClassName}
        childrenContainerClassName={progressChildrenContainerClassName}
        color={progressColor}
        containerClassName={clsx(s.ProgressArrowLabelCard__progress_container, progressContainerClassName)}
        donutHoleClassName={progressDonutHoleClassName}
        holeColor={progressHoleColor}
        percentage={progressPercentage}
        progressBackgroundSvgClassName={progressProgressBackgroundSvgClassName}
        progressSvgClassName={progressProgressSvgClassName}
        strokeWidth={progressStrokeWidth}
        wrapperClassName={progressWrapperClassName}>
        <div
          className={clsx(
            s.progress_container__arrow_container_wrapper,
            progressContainerArrowContainerWrapperClassName
          )}>
          <div className={clsx(s.progress_container__arrow_container, progressContainerArrowContainerClassName)}>
            <ArrowWithLineIcon
              className={clsx(s.progress_container__arrow, progressContainerArrowClassName)}
              style={{ transform: `rotate(${rotation}deg)` }}
            />
          </div>
        </div>
      </CircleProgressWithChildren>

      <div className={clsx(s.ProgressArrowLabelCard__details_container, detailsContainerClassName)}>
        <Text
          className={clsx(s.details_container__title, titleClassName)}
          color="textSecondary"
          text={title}
          variant={TextPropsVariantsEnum.CAPTION_M}
        />

        <Text
          className={clsx(s.details_container__value, valueClassName)}
          text={`${progressPercentage}%`}
          variant={TextPropsVariantsEnum.H3}
        />
      </div>
    </div>
  );
};
