import React from 'react';

import clsx from 'clsx';

import { ReactComponent as ProjectIcon } from 'assets/icons/project.svg';
import { CircleChart } from 'common/components/ui/_charts/CircleChart/CircleChart';
import { ColorDotLabel } from 'common/components/ui/_labels/ColorDotLabel/ColorDotLabel';
import { LabelWithExtra } from 'common/components/ui/_labels/LabelWithExtra/LabelWithExtra';
import { Button } from 'common/components/ui/Button';
import { Loader } from 'common/components/ui/Loader/Loader';
import { TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { WidgetHeader } from 'routes/dashboard/widgets/WidgetHeader/WidgetHeader';

import { TTodayTasksWidgetProps } from './types.TodayTasksWidget';

import s from './TodayTasksWidget.module.scss';

export interface ITodayTasksWidgetProps {
  buttonClassName?: string;
  chartChildrenClassName?: string;
  chartChildrenContainerClassName?: string;
  chartChildrenContentContainerClassName?: string;
  chartChildrenExtraClassName?: string;
  chartChildrenTextClassName?: string;
  chartContainerClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  contentWrapperClassName?: string;
  headerContainerClassName?: string;
  headerContentClassName?: string;
  headerIconClassName?: string;
  labelsClassName?: string;
  labelsContainerClassName?: string;
  labelsDotsClassName?: string;
  labelsExtraClassName?: string;
  labelsTextClassName?: string;
  labelsWrapperClassName?: string;
}

export const TodayTasksWidget: React.FC<ITodayTasksWidgetProps & TTodayTasksWidgetProps> = (props) => {
  const {
    buttonClassName,
    chartChildrenClassName,
    chartChildrenContainerClassName,
    chartChildrenContentContainerClassName,
    chartChildrenExtraClassName,
    chartChildrenTextClassName,
    chartContainerClassName,
    chartData,
    containerClassName,
    contentClassName,
    contentWrapperClassName,
    headerContainerClassName,
    headerContentClassName,
    headerIconClassName,
    isDataLoading = false,
    labelsClassName,
    labelsContainerClassName,
    labelsDotsClassName,
    labelsExtraClassName,
    labelsTextClassName,
    labelsWrapperClassName,
    newTasksNumber,
    title,
    total
  } = props;

  return (
    <div className={clsx(s.TodayProjectsWidget__container, containerClassName, isDataLoading && s.loading)}>
      {isDataLoading ? (
        <Loader />
      ) : (
        <div className={clsx(s.TodayProjectsWidget__content, contentClassName)}>
          <WidgetHeader
            buttonLabel="View all"
            buttonLink="/"
            containerClassName={clsx(s.content__header_container, headerContainerClassName)}
            contentClassName={clsx(s.content__header_content, headerContentClassName)}
            icon={<ProjectIcon />}
            iconClassName={clsx(s.header__icon, headerIconClassName)}
            title={title}
          />

          <div className={clsx(s.content__wrapper, contentWrapperClassName)}>
            <div className={clsx(s.content__chart_container, chartContainerClassName)}>
              <CircleChart
                childrenClassName={clsx(s.chart__children, chartChildrenClassName)}
                childrenContainerClassName={clsx(s.chart__children_container, chartChildrenContainerClassName)}
                data={chartData}>
                <LabelWithExtra
                  containerClassName={clsx(s.chart__children_content_container, chartChildrenContentContainerClassName)}
                  extra={`+${newTasksNumber}`}
                  extraClassName={clsx(s.chart__children_extra, chartChildrenExtraClassName)}
                  extraVariant={TextPropsVariantsEnum.CAPTION_M}
                  text={String(total)}
                  textClassName={clsx(s.chart__children_text, chartChildrenTextClassName)}
                  textVariant={TextPropsVariantsEnum.H1}
                />
              </CircleChart>
            </div>

            <div className={clsx(s.content__labels_wrapper, labelsWrapperClassName)}>
              <div className={clsx(s.content__labels_container, labelsContainerClassName)}>
                {chartData?.map((l) => {
                  const { color, label, value } = l;

                  return (
                    <Button
                      className={clsx(s.labels__button, buttonClassName)}
                      color="transparent-outlined"
                      key={label}
                      variant="primary">
                      <ColorDotLabel
                        containerClassName={clsx(s.labels__container, labelsClassName)}
                        dotClassName={clsx(s.labels__dot, labelsDotsClassName)}
                        dotColor={color}
                        extraValue={String(value)}
                        extraValueClassName={clsx(s.labels__extra, labelsExtraClassName)}
                        text={label}
                        textClassName={clsx(s.labels__text, labelsTextClassName)}
                      />
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
