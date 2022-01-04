import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

import clsx from 'clsx';

import { ReactComponent as ProjectsIcon } from 'assets/icons/projects.svg';
import { HouseTaskCard } from 'common/components/ui/_cards/HouseTaskCard/HouseTaskCard';
import { ColumnBarChart } from 'common/components/ui/_charts/ColumnBarChart/ColumnBarChart';
import { ColorDotLabel } from 'common/components/ui/_labels/ColorDotLabel/ColorDotLabel';
import { Loader } from 'common/components/ui/Loader/Loader';
import { WidgetHeader } from 'routes/dashboard/widgets/WidgetHeader/WidgetHeader';

import { TTodayProjectsWidgetProps } from './types.TodayProjectsWidget';

import s from './TodayProjectsWidget.module.scss';

export interface ITodayProjectsWidgetProps {
  chartContainerClassName?: string;
  containerClassName?: string;
  contentClassName?: string;
  contentContainerClassName?: string;
  contentContainerHeaderClassName?: string;
  headerContainerClassName?: string;
  headerContentClassName?: string;
  headerIconClassName?: string;
  headerLabelsClassName?: string;
  headerLabelsContainerClassName?: string;
  headerLabelsDotsTextClassName?: string;
  headerLabelsTextClassName?: string;
  listClassName?: string;
  listContainerClassName?: string;
  listContainerScrollClassName?: string;
  title?: string;
}

export const TodayProjectsWidget: React.FC<ITodayProjectsWidgetProps & TTodayProjectsWidgetProps> = (props) => {
  const {
    activeTasks,
    chartContainerClassName,
    chartData,
    completedTasks,
    containerClassName,
    contentClassName,
    contentContainerClassName,
    headerContainerClassName,
    headerContentClassName,
    headerIconClassName,
    headerLabelsClassName,
    headerLabelsContainerClassName,
    headerLabelsDotsTextClassName,
    headerLabelsTextClassName,
    isDataLoading = false,
    listClassName,
    listContainerClassName,
    listContainerScrollClassName,
    overdueTasks,
    tasks,
    title = 'Today projects'
  } = props;

  const labelsData = chartData?.map((item) => ({
    color: item.color,
    label: item.label
  }));

  return (
    <div className={clsx(s.TodayProjectsWidget__container, containerClassName, isDataLoading && s.loading)}>
      {isDataLoading ? (
        <Loader />
      ) : (
        <div className={clsx(s.TodayProjectsWidget__content_container, contentContainerClassName)}>
          <WidgetHeader
            childrenClassName={clsx(s.header__labels_container, headerLabelsContainerClassName)}
            containerClassName={clsx(s.content__header_container, headerContainerClassName)}
            contentClassName={clsx(s.content__header_content, headerContentClassName)}
            icon={<ProjectsIcon />}
            iconClassName={clsx(s.header__icon, headerIconClassName)}
            title={title}>
            {labelsData?.map((l) => {
              const { color, label } = l;

              return (
                <ColorDotLabel
                  containerClassName={clsx(s.header__labels, headerLabelsClassName)}
                  dotClassName={clsx(s.labels__dot, headerLabelsDotsTextClassName)}
                  dotColor={color}
                  key={label}
                  text={label}
                  textClassName={clsx(s.labels__text, headerLabelsTextClassName)}
                />
              );
            })}
          </WidgetHeader>

          <div className={clsx(s.TodayProjectsWidget__content, contentClassName)}>
            <div className={clsx(s.content__chart_container, chartContainerClassName)}>
              <ColumnBarChart data={chartData} />
            </div>

            <div className={clsx(s.content__list_container, listContainerClassName)}>
              <Scrollbars>
                <div className={clsx(s.content__list, listClassName)}>
                  {tasks?.map((task) => (
                    <HouseTaskCard
                      buttonLabel="Show details"
                      containerClassName={s.HouseTaskCard__container}
                      contentClassName={s.HouseTaskCard__content}
                      key={task.id}
                      linkTo=""
                      title={task.title}
                    />
                  ))}
                </div>
              </Scrollbars>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
