import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

import clsx from 'clsx';

import { ReactComponent as CalendarIcon } from 'assets/icons/calendar.svg';
import { UpcomingEventCard } from 'common/components/ui/_cards/UpcomingEventCard/UpcomingEventCard';
import { Loader } from 'common/components/ui/Loader/Loader';
import { WidgetHeader } from 'routes/dashboard/widgets/WidgetHeader/WidgetHeader';

import { TUpcomingEventsWidgetProps } from './types.UpcomingEventsWidget';

import s from './UpcomingEventsWidget.module.scss';

export interface IUpcomingEventsWidgetProps {
  containerClassName?: string;
  contentClassName?: string;
  headerContainerClassName?: string;
  headerContentClassName?: string;
  headerIconClassName?: string;
  listWrapperClassName?: string;
}

export const UpcomingEventsWidget: React.FC<IUpcomingEventsWidgetProps & TUpcomingEventsWidgetProps> = (props) => {
  const {
    containerClassName,
    contentClassName,
    data,
    headerContainerClassName,
    headerContentClassName,
    headerIconClassName,
    isDataLoading = false,
    listWrapperClassName,
    title
  } = props;

  return (
    <div className={clsx(s.UpcomingEventsWidget__container, containerClassName, isDataLoading && s.loading)}>
      {isDataLoading ? (
        <Loader />
      ) : (
        <div className={clsx(s.UpcomingEventsWidget__content, contentClassName)}>
          <WidgetHeader
            buttonLabel="View all"
            buttonLink="/"
            containerClassName={clsx(s.content__header_container, headerContainerClassName)}
            contentClassName={clsx(s.content__header_content, headerContentClassName)}
            icon={<CalendarIcon />}
            iconClassName={clsx(s.header__icon, headerIconClassName)}
            title={title}
          />

          <div className={clsx(s.content__list_wrapper, listWrapperClassName)}>
            <Scrollbars>
              <div className={s.content__list_container}>
                {data?.map((event) => {
                  const eventLink = '/';
                  const authorLink = '/';
                  const locationLink = '/';
                  const imagesLink = '/';

                  return (
                    <div className={s.list__item} key={event.id}>
                      <UpcomingEventCard
                        authorLink={authorLink}
                        containerClassName={s.item__container}
                        contentClassName={s.item__content}
                        eventLink={eventLink}
                        imagesLink={imagesLink}
                        locationLink={locationLink}
                        {...event}
                      />
                    </div>
                  );
                })}
              </div>
            </Scrollbars>
          </div>
        </div>
      )}
    </div>
  );
};
