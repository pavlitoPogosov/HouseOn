import React from 'react';

import clsx from 'clsx';

import {
  ProgressArrowLabelCard,
  EProgressArrowLabelCardStates
} from 'common/components/ui/_cards/ProgressArrowLabelCard/ProgressArrowLabelCard';
import { Loader } from 'common/components/ui/Loader/Loader';
import { EColors } from 'variables/colors';

import { TProgressBoardWidgetProps } from './types.ProgressBoardWidget';

import s from './ProgressBoardWidget.module.scss';

export interface IProgressBoardWidgetProps {
  chartContainerClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  progressStrokeWidth?: number;
}

export const ProgressBoardWidget: React.FC<IProgressBoardWidgetProps & TProgressBoardWidgetProps> = (props) => {
  const {
    chartContainerClassName,
    containerClassName,
    contentClassName,
    isDataLoading = false,
    progressStrokeWidth = 8
  } = props;

  const data = [
    {
      arrowState: EProgressArrowLabelCardStates.UP_RIGHT,
      progressPercentage: 84,
      title: 'Tasks completed'
    },

    {
      arrowState: EProgressArrowLabelCardStates.DOWN_RIGHT,
      progressPercentage: 8,
      title: 'Tasks overdue'
    },

    {
      arrowState: EProgressArrowLabelCardStates.UP_RIGHT,
      progressPercentage: 92,
      title: 'Team efficiency'
    },

    {
      arrowState: EProgressArrowLabelCardStates.UP_RIGHT,
      progressPercentage: 10,
      title: 'HouseData filled'
    }
  ];

  const progressColors: { [key: number]: EColors } = {
    0: EColors.BLUE200,
    1: EColors.RED200,
    2: EColors.GREEN200,
    3: EColors.ORANGE200
  };

  return (
    <div className={clsx(s.ProgressBoardWidget__container, containerClassName, isDataLoading && s.loading)}>
      {isDataLoading ? (
        <Loader />
      ) : (
        <div className={clsx(s.ProgressBoardWidget__content, contentClassName)}>
          <div className={clsx(s.content__chart_container, chartContainerClassName)}>
            {data?.map((card, i) => {
              const { arrowState, progressPercentage, title } = card;

              return (
                <ProgressArrowLabelCard
                  arrowState={arrowState}
                  containerClassName={s.chart_container__ProgressArrowLabelCard}
                  key={title}
                  progressColor={progressColors[i]}
                  progressPercentage={progressPercentage}
                  progressStrokeWidth={progressStrokeWidth}
                  progressWrapperClassName={s.ProgressArrowLabelCard__progressWrapper}
                  title={title}
                  titleClassName={s.ProgressArrowLabelCard__title}
                  valueClassName={s.ProgressArrowLabelCard__value}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
