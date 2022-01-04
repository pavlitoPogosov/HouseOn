import React, { useEffect, useState } from 'react';
import ContentLoader from 'react-content-loader';
import { useIntl } from 'react-intl';
import { useHistory } from 'react-router-dom';

import { apolloClient } from 'appStores';
import moment from 'moment';

import { Button } from 'common/components/ui/Button';
import { Text, TextPropsVariantsEnum } from 'common/components/ui/Text/Text';
import { QUERY_EVENTS_VIEW } from 'graphql/queries/events';
import { EventSortingFieldsEnum, HouseEventPageInput, HouseEventType, SortingDirectionEnum } from 'graphql/types';
import { VIEW_EVENT_PAGE_ROUTE } from 'utils/routes';

import { AllEventsTabsValues } from '../AllEventsPage';

import { CreateEventsCard } from './CreateEventsCard/CreateEventsCard';
import { EventsCard } from './EventsCard/EventsCard';

import s from './EventsList.module.scss';

type TEventsListProps = {
  chosenTab: string;
  direction: SortingDirectionEnum;
};

type TEventsMap = {
  [date: string]: HouseEventType[];
};

const getMappedEvents = (events: HouseEventType[]) => {
  const eventsMap: TEventsMap = events
    .map((e) => e.starts_at.format('MMMM DD YYYY'))
    .reduce((accom, date) => {
      if (!accom[date]) {
        return {
          ...accom,
          [date]: []
        };
      }

      return accom;
    }, {} as TEventsMap);

  events.forEach((e) => {
    const eDate = e.starts_at.format('MMMM DD YYYY');

    eventsMap[eDate] = [...(eventsMap[eDate] || []), e];
  });

  return eventsMap as { [date: string]: HouseEventType[] };
};

const initialData = {
  currentPage: 1,
  hasNext: false,
  isLoading: true,
  shownEvents: {} as { [date: string]: HouseEventType[] },
  totalCount: null as number | null
};

export const EventsList: React.FC<TEventsListProps> = (props) => {
  const { chosenTab, direction } = props;

  const intl = useIntl();

  const [data, setData] = useState(initialData);

  const filter = chosenTab === AllEventsTabsValues.ACTIVE ? { starts_at: moment() } : { ends_at: moment() };

  useEffect(() => {
    const initialFetch = async () => {
      setData(initialData);

      const resp = await apolloClient.query<{ result: any }, { input: HouseEventPageInput }>({
        query: QUERY_EVENTS_VIEW,
        variables: {
          input: {
            filter,
            pagination: {
              onePage: 12,
              page: 1
            },
            sorting: [
              {
                direction,
                field: EventSortingFieldsEnum.StartsAt
              }
            ]
          }
        }
      });

      setData((prev) => ({
        ...prev,
        hasNext: resp.data.result.header.hasNext,
        isLoading: false,
        shownEvents: getMappedEvents(resp.data.result.list),
        totalCount: resp.data.result.header.totalCount
      }));
    };

    initialFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chosenTab, direction]);

  const history = useHistory();

  const handleCardClick = (id: string) => {
    return () => {
      history.push(VIEW_EVENT_PAGE_ROUTE.replace(':id(\\d+)', id));
    };
  };

  const handleShowMore = async () => {
    setData((prev) => ({
      ...prev,
      isLoading: true
    }));

    const page = data.currentPage + 1;

    const resp = await apolloClient.query({
      query: QUERY_EVENTS_VIEW,
      variables: {
        input: {
          filter,
          pagination: {
            onePage: 12,
            page
          },
          sorting: [
            {
              direction,
              field: EventSortingFieldsEnum.StartsAt
            }
          ]
        }
      }
    });

    const oldEvents = { ...data.shownEvents };
    const newEvents = (resp.data.result.list as HouseEventType[]).map((e) => {
      const eDate = moment(e.ends_at).clone().startOf('day').toISOString();

      if (oldEvents[eDate]) {
        oldEvents[eDate] = oldEvents[eDate].concat(e);
      }

      return e;
    });

    setData((prev) => ({
      ...prev,
      currentPage: page,
      hasNext: resp.data.result.header.hasNext,
      isLoading: false,
      shownEvents: {
        ...oldEvents,
        ...getMappedEvents(newEvents)
      }
    }));
  };

  const handleDeleteEvent = (id: string) => {};

  const renderLoader = () => (
    <>
      {new Array(2).fill(1).map((_, i) => (
        <div className={s.EventsList__block} key={i}>
          <ContentLoader
            backgroundColor="#f3f3f3"
            className={s.EventsList__blockTitleLoader}
            foregroundColor="#ecebeb"
            height="21"
            preserveAspectRatio="none"
            speed={2}
            viewBox="0 0 100 21"
            width="100%"
          >
            <rect height="21" rx="0" ry="0" width="300" x="0" y="0" />
          </ContentLoader>

          <div className={s.EventsList__eventsContainer}>
            {new Array(3).fill(1).map((_, i) => (
              <ContentLoader
                backgroundColor="#f3f3f3"
                className={s.EventsList__eventLoader}
                foregroundColor="#ecebeb"
                height="272"
                key={`eventloader-${i}`}
                preserveAspectRatio="none"
                speed={2}
                viewBox="0 0 100 272"
                width="100%"
              >
                <rect height="272" rx="0" ry="0" width="300" x="0" y="0" />
              </ContentLoader>
            ))}
          </div>
        </div>
      ))}
    </>
  );

  const renderContent = () => (
    <>
      <div className={s.EventsList__title_wrappper}>
        <Text
          text={intl.formatMessage({ defaultMessage: 'Events', id: 'event.header.title' })}
          variant={TextPropsVariantsEnum.H2}
        />

        {!!data.totalCount && (
          <Text className={s.EventsList__count} text={String(data.totalCount)} variant={TextPropsVariantsEnum.BODY_M} />
        )}
      </div>

      <div className={s.EventsList__createEventContainer}>
        <CreateEventsCard />
      </div>

      {Object.entries(data.shownEvents).map(([title, events]) => (
        <div className={s.EventsList__block} key={title}>
          <Text className={s.EventsList__blockTitle} variant={TextPropsVariantsEnum.CAPTION_M}>
            {moment(title).format('MMMM D')}
          </Text>

          <div className={s.EventsList__eventsContainer}>
            {events.map((event) => (
              <EventsCard
                event={event}
                key={event.id}
                onClick={handleCardClick(event.id)}
                onDeleteEvent={handleDeleteEvent}
              />
            ))}
          </div>
        </div>
      ))}

      {data.hasNext && (
        <Button
          className={s.EventsList__showMore}
          color="orange"
          isLoading={data.isLoading}
          onClick={handleShowMore}
          variant="secondary"
        >
          Show more
        </Button>
      )}
    </>
  );

  return data.isLoading && Object.keys(data.shownEvents).length === 0 ? renderLoader() : renderContent();
};
